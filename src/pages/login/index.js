import React, { useState, useCallback } from 'react';
import {
  Button, Row, Form, Input, Col, message,
  Select
} from 'antd';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { genItems } from '@/utils/form';
import { local } from '@/utils/cache';
import _api from './services';
import { useRouter } from '@/hooks';
// import appStore from '@/stores/app';
import styles from './index.module.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const login = observer(({
  form
}) => {
  const router = useRouter();
  const [tenants, setTenants] = useState([]);
  const whitespaceValid = (rule, value, cb) => {
    if (!value) cb();
    if (/^ +| +$/g.test(value)) {
      cb('用户名中不能包含空格');
    }
    cb();
  };

  const onValuesChange = useCallback(_.debounce(() => {
    if (tenants.length) {
      setTenants([]);
    }
  }, 300), [tenants]);

  const handleOk = () => {
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        return;
      }
      const data = values;
      try {
        const res = await _api.login(data);
        if (!res) {
          return;
        }
        if (typeof res === 'string') {
          local.set('access_token', res);
          return router.push({
            path: '/'
          });
        }
        if (res.access_token) {
          local.set('access_token', `${res.Bearer} ${res.access_token}`);
          return router.push({
            path: '/'
          });
        }
        const _tenants = [];
        Object.keys(res).forEach(key => {
          _tenants.push({
            id: key,
            name: res[key]
          });
        });
        setTenants(_tenants);
        // appStore.update({
        //   loginInfo: res
        // });
      } catch (msg) {
        message.error(msg);
      }
    });
  };

  const formItems = [
    {
      key: 'username',
      props: {
        label: '账号',
        required: false
      },
      decorator: {
        rules: [
          { required: true, message: '请填写用户名' },
          { validator: whitespaceValid }
        ]
      },
      component: <Input
        size="large"
        placeholder="请填写用户名"
        onChange={onValuesChange}
      />
    },
    {
      key: 'password',
      props: {
        label: '密码',
        required: false
      },
      decorator: {
        rules: [
          { required: true, message: '请输入密码' }
        ]
      },
      component: <Input
        size="large"
        type="password"
        placeholder="请输入密码"
        // onPressEnter={handleOk}
        onChange={onValuesChange}
      />
    },
    {
      key: 'tenantId',
      hide: !tenants || !tenants.length,
      props: {
        label: '请选择租户'
      },
      decorator: {
        rules: [
          { required: true, message: '请选择租户' }
        ]
      },
      component: <Select>
        {tenants.map(item => (
          <Option key={item.id} value={item.id}>{item.name}</Option>
        ))}
      </Select>
    }
  ];

  return (
    <div className={styles.login}>
      <div className={styles['login-title']}>
        登录
      </div>
      <Form autoComplete="off" {...formItemLayout}>
        {genItems(formItems, form)}
      </Form>
      <Row>
        <Col span={24}>
          <Button size="large" className={styles['login-btn']} type="primary" onClick={handleOk}>
              登录
          </Button>
        </Col>
      </Row>
    </div>
  );
});

export default Form.create()(login);

import React, { useCallback } from 'react';
import { useMount } from 'react-use';
import { observer } from 'mobx-react';
import {
  Form, Input, Checkbox
} from 'antd';
import { useActionModal } from '@/hooks';
import style from './ActionModal.module.less';

const { TextArea } = Input;

const { Group: CheckboxGroup } = Checkbox;

const ActionModal = observer(({
  form,
  store
}) => {
  useMount(() => {
    // 查询服务单元
    store.queryServeUnits();
  });

  const {
    entity, action, serveUnitArr, serveUnitMap
  } = store;

  const dataToEnd = useCallback(({ _nodeName, serverUnits = [], ...rest }) => ({
    ...rest,
    nodeName: _nodeName,
    serverUnits: serverUnits.map(key => ({
      ...serveUnitMap[key],
      serverId: key
    }))
  }));

  const { createModal } = useActionModal({
    name: '服务节点', form, store, dataToEnd
  });

  const formItems = [
    {
      key: 'nodeCode',
      hide: action === 'add',
      props: {
        label: '节点编码'
      },
      decorator: {
        initialValue: entity.nodeCode
      },
      component: <Input disabled={action === 'edit'} />
    },
    {
      // key不能为nodeName, 有冲突会报错，保存的时候需要替换回nodeName
      key: '_nodeName',
      props: {
        label: '节点名称'
      },
      decorator: {
        initialValue: entity.nodeName,
        rules: [
          { required: true, message: '请输入节点名称' },
          { max: 20, message: '节点名称不能超过20个字符' }
        ]
      }
    },
    {
      key: 'nodeIp',
      props: {
        label: '节点IP'
      },
      decorator: {
        initialValue: entity.nodeIp,
        rules: [
          { required: true, pattern: CST.REG_EXP.IP_V4, message: '请输入正确的节点IP' }
        ]
      }
    },
    {
      key: 'description',
      props: {
        label: '节点描述'
      },
      decorator: {
        initialValue: entity.description,
        rules: [
          { max: 50, message: '节点描述不能超过50个字符' }
        ]
      },
      component: <TextArea />
    },
    {
      key: 'serverUnits',
      props: {
        label: '服务单元'
      },
      decorator: {
        initialValue: (entity.serverUnits || []).map(item => item.serverId)
      },
      component: <CheckboxGroup>
        {serveUnitArr.map(unit => <Checkbox className="f-toe1" key={unit.id} value={unit.id}>{unit.name}</Checkbox>)}
      </CheckboxGroup>
    }
  ];
  return createModal({
    modalProps: {
      width: 640,
      className: style['action-modal']
    },
    formProps: {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 }
    },
    formItems
  });
});


export default Form.create()(ActionModal);

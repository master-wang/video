import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Form, Button, Icon } from 'antd';
import { genItems } from '@/utils/form';
import style from './SearchForm.module.less';

const TableSearch = observer(({
  formItems,
  form,
  store,
  formProps,
  dataToEnd,
  resetFun,
  formNum = 3,
  showExtend = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // 查询事件监听
  const onSearch = useCallback(() => {
    let params = form.getFieldsValue();
    params = dataToEnd ? dataToEnd(params) : params;
    store.queryPaging({
      query: params,
      pagination: { current: 1 }
    });
  }, [store]);

  // 重置事件监听
  const onReset = useCallback(async () => {
    form.resetFields();
    store.reset(['query', 'pagination']);
    // 如果有自定义函数，重置事件之后在查询之前执行自定义函数
    if (resetFun) {
      await resetFun({ form, store });
    }
    store.queryPaging();
  }, [form, store]);

  const formRender = (isOpenState) => {
    const formItemsTemp = _.clone(formItems, true);
    const { length } = formItemsTemp;
    const controlItem = {
      key: '_control',
      props: {
        className: style['form-control-wrap']
      },
      component: <div>
        <Button type="primary" onClick={onSearch}>查询</Button>
        <Button onClick={onReset} style={{ marginLeft: '10px' }}>重置</Button>
        { showExtend ? <Button type="link" onClick={() => setIsOpen(!isOpen)}>
          { isOpen ? '收起' : '展开'}
          <Icon type="caret-down" className={[style['form-control'], isOpen ? style['icon-up'] : '']} />
        </Button> : null }

      </div>
    };
    if (isOpenState) {
      // 在末尾部位，让控制的组件出现在最右边,因为一行三个表单
      const pushNumber = (length + 1) % formNum;
      if (!pushNumber) {
        formItemsTemp.push(controlItem);
      } else {
        for (let i = 0; i < formNum - pushNumber; i++) {
          formItemsTemp.push({
            key: `_space${i}`,
            component: <></>
          });
        }
        formItemsTemp.push(controlItem);
      }
    } else {
      formItemsTemp[formNum - 1] = controlItem;
      formItemsTemp.splice(formNum, length - formNum);
    }
    return <Form autoComplete="off" layout="inline" {...formProps}>
      {genItems(formItemsTemp, form)}
    </Form>;
  };

  return (
    <div className={formNum === 3 ? style['search-form'] : style['search-form-four']}>
      <div className="col-l">
        {formRender(isOpen)}
      </div>
    </div>
  );
});

export default TableSearch;

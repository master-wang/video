import React, { useCallback, useMemo } from 'react';
import { Modal, Form } from 'antd';
import _ from 'lodash';
import { genItems } from '@/utils/form';

/**
 * @param {string} name: 模块名称
 * @param {object} form: 表单对象
 * @param {object} store: 状态管理对象
 * @param {array} resetKeys: 关闭弹窗时，需要重置的属性集合
 * @param {function|boolean} dataToEnd: 将form表单数据转换为后台需要的格式
 */
export default function useActionModal({
  name,
  form,
  store,
  resetKeys,
  dataToEnd
}) {
  const { visible, action, entity } = store;

  const title = useMemo(() => (`${action === 'add' ? '新增' : '编辑'}${name}`), [name, action]);

  const _dataToEnd = useCallback((data) => {
    // 交给外部函数处理
    if (_.isFunction(dataToEnd)) {
      return dataToEnd(data);
    }
    // 不处理
    if (dataToEnd === false) {
      return data;
    }
    // 默认处理
    const params = data;
    if (action === 'edit') {
      params.id = entity.id;
    }
    return params;
  }, [action, entity, dataToEnd]);

  // 响应弹窗取消事件
  const onCancel = useCallback(() => {
    store.reset(resetKeys || ['visible']);
    form.resetFields();
  }, [store, form, resetKeys]);

  // 响应弹窗确定事件
  const onOk = useCallback(() => {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      const params = _dataToEnd(values);
      (store.save || store[store.action])(params, () => {
        onCancel();
        store.queryPaging();
      });
    });
  }, [store, form, onCancel, _dataToEnd]);

  // 创建默认弹窗
  const createModal = ({
    modalProps,
    formProps,
    formItems,
    extraNode = null
  }) => (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      {...modalProps}
    >
      {extraNode}
      <Form autoComplete="off" {...formProps}>
        {genItems(formItems, form)}
      </Form>
    </Modal>
  );

  return {
    title,
    onCancel,
    onOk,
    createModal
  };
}

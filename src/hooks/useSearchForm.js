import React, { useCallback } from 'react';
import { Form } from 'antd';
import { genItems } from '@/utils/form';

/**
 * @param {object} form: 表单对象
 * @param {object} store: 状态管理对象
 * @param {function} dataToEnd: 将form表单数据转换为后台需要的格式
 */
export default function useSearchForm({
  form,
  store,
  dataToEnd
}) {
  // 查询事件监听
  const onSearch = useCallback(() => {
    // TODO: antd 由来已久的一个问题，在formItem中 onChange 中调用form.getFieldsValue 是上一次的数值。 加入setTimeout
    // 在antd的源码中onCollect部分 setFields 是发生在 onChange之后 因此setFieldsValue 与 getFieldsValue 会出现类似问题
    setTimeout(() => {
      let params = form.getFieldsValue();
      params = dataToEnd ? dataToEnd(params) : params;
      store.queryPaging({
        query: params,
        pagination: { current: 1 }
      });
    }, 0);
  }, [store]);

  // 创建默认的form表单
  const createForm = ({
    formProps,
    formItems
  }) => (
    <Form autoComplete="off" layout="inline" {...formProps}>
      {genItems(formItems, form)}
    </Form>
  );

  return {
    onSearch,
    createForm
  };
}

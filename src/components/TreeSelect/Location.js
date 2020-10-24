import React, {
  useReducer, useCallback, useMemo, useRef, forwardRef
} from 'react';
import { useDeepCompareEffect } from 'react-use';
import { TreeSelect } from 'antd';
import _ from 'lodash';

function format(data) {
  const res = [];
  data.forEach(item => {
    res.push({
      id: item.id,
      pId: item.pid,
      value: item.id,
      title: item.name,
      isLeaf: !item.hasChild
    });
  });
  return res;
}

function reducer(state, { type, payload }) {
  const { midVal, treeData, defaultExpandedKeys } = state;
  switch (type) {
    case 'UPDATE_MID_VAL':
      return {
        treeData,
        defaultExpandedKeys,
        midVal: payload
      };
    case 'CONCAT_TREE_DATA':
      return {
        midVal,
        defaultExpandedKeys,
        treeData: treeData.concat(format(payload))
      };
    case 'UPDATE_VAL_KEY':
      return {
        treeData,
        ...payload
      };
    default:
      throw new Error();
  }
}

/**
 * 位置信息树形选择框
 */
export default forwardRef(({
  value,
  fullValue,
  allInValue = true,
  appendToBody,
  dropdownStyle,
  onChange,
  ...rest
}, ref) => {
  const [state, dispatch] = useReducer(reducer, {
    midVal: null,
    treeData: [],
    defaultExpandedKeys: []
  });

  const idMap = useRef({});

  const loadData = useCallback((treeNode = {}) => {
    const { id = 0 } = treeNode.props || {};
    if (idMap.current[id]) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    idMap.current = { ...idMap.current, [id]: true };
    return new Promise((resolve) => {
      req.ajax(`/videobigdata/location/tree/${id}`, {
        method: 'get',
        data: { lazy: true }
      }).then(data => {
        if (data) {
          dispatch({ type: 'CONCAT_TREE_DATA', payload: data });
        }
        resolve();
      });
    });
  }, [dispatch]);

  const _onChange = useCallback((val, label, extra) => {
    dispatch({
      type: 'UPDATE_MID_VAL',
      payload: val
    });
    if (allInValue && val) {
      const props = _.get(extra, 'triggerNode.props', {});
      const temp = {
        id: props.value,
        pid: props.pId,
        name: props.title
      };
      onChange && onChange(temp);
    } else {
      onChange && onChange(val);
    }
  }, [dispatch]);

  const _dropdownStyle = useMemo(() => ({
    maxHeight: '300px',
    ...dropdownStyle
  }), [dropdownStyle]);

  const getPopupContainer = useCallback((trigger) => {
    if (appendToBody) {
      return document.body;
    }
    return trigger.parentNode;
  }, [appendToBody]);

  useDeepCompareEffect(() => {
    loadData();
    let current = fullValue;
    const paths = [];
    const defaultExpandedKeys = [];
    while (current) {
      paths.push(current);
      current = _.get(current, 'child[0]');
    }
    for (let i = 0, len = paths.length; i < len - 1; i++) {
      defaultExpandedKeys.push(`${paths[i].id}`);
      loadData({ props: paths[i] });
    }
    if (paths.length) {
      const last = paths[paths.length - 1];
      dispatch({
        type: 'UPDATE_VAL_KEY',
        payload: {
          defaultExpandedKeys,
          midVal: last.id
        }
      });
      if (allInValue) {
        onChange && onChange(last);
      } else {
        onChange && onChange(last.id);
      }
    }
  }, [fullValue, dispatch]);
  return (
    <TreeSelect
      placeholder="请选择"
      treeDataSimpleMode
      ref={ref}
      value={state.midVal}
      treeData={state.treeData}
      treeDefaultExpandedKeys={state.defaultExpandedKeys}
      getPopupContainer={getPopupContainer}
      loadData={loadData}
      onChange={_onChange}
      dropdownStyle={_dropdownStyle}
      {...rest}
    />
  );
});

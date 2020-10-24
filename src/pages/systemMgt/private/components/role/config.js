import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Form, Modal, Row, Col,
  Tree, Checkbox, message
} from 'antd';
import { toJS } from 'mobx';
import TreeInfo from './config/tree';
import { genItems } from '@/utils/form';
import { menuItems } from '../../constants';
import style from './index.module.less';

const formProps = {};
// eslint-disable-next-line no-unused-vars
const { TreeNode } = Tree;

const config = (observer(({
  form,
  store
}) => {
  const {
    configVisible,
    // 权限操作的全选控制
    checkedList, indeterminate, checkAll,
    entity
  } = store;
  const formItems = [];
  const privateArr = [];

  const onCancel = useCallback(() => {
    store.update({ configVisible: false, resCheckedList: [], checkedList: [] });
  });

  useEffect(() => {
    if (!Object.keys(entity).length) {
      return;
    }
    const menusSearch = [];
    if (entity.aiAnalysis) {
      const arr = entity.aiAnalysis.split(',');
      arr.forEach((item) => {
        menusSearch.push(`aiAnalysis&&${item}`);
      });
    }
    if (entity.systemSetting) {
      const arr = entity.systemSetting.split(',');
      arr.forEach((item) => {
        menusSearch.push(`systemSetting&&${item}`);
      });
    }
    if (entity.videoApplication) {
      const arr = entity.videoApplication.split(',');
      arr.forEach((item) => {
        menusSearch.push(`videoApplication&&${item}`);
      });
    }
    if (entity.videoSetting) {
      const arr = entity.videoSetting.split(',');
      arr.forEach((item) => {
        menusSearch.push(`videoSetting&&${item}`);
      });
    }
    store.update({
      resCheckedList: entity.channelIds,
      checkedList: menusSearch
    });
  }, [entity]);

  const onOk = useCallback(async () => {
    if (!store.checkedList.length) {
      message.info('请选择操作权限！');
      return;
    }
    if (!store.resCheckedList.length) {
      message.info('请选择资源权限！');
      return;
    }
    const menuPrivate = {};
    store.checkedList.forEach((item) => {
      const [key, valTemp] = item.split('&&');
      const vals = valTemp.split('-');
      const oldVals = menuPrivate[key] ? menuPrivate[key].split(',') : [];
      const valsSet = new Set([...vals, ...oldVals]);
      menuPrivate[key] = [...valsSet].join(',');
    });
    const params = {
      ...entity,
      channelIds: toJS(store.resCheckedList),
      ...menuPrivate
    };
    await store.updatePri(params);
    onCancel();
  });

  const renderTreeNode = (data) => {
    if (!data) {
      return null;
    }
    return data.map((item) => {
      const {
        children, name, id
      } = item;
      privateArr.push(`${id}`);
      if (!children) {
        return (
          <TreeNode
            key={id}
            id={id}
            dataRef={item}
            value={`private_${id}`}
            title={name}
          >
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={id}
          id={id}
          dataRef={item}
          value={`private_${id}`}
          title={name}
        >
          {renderTreeNode(children)}
        </TreeNode>
      );
    });
  };
  const Nodes = renderTreeNode(menuItems);

  const onCheck = (checkedKeys, info) => {
    // eslint-disable-next-line no-console
    console.log('操作权限onCheck', checkedKeys, info);
    store.update({
      checkedList: checkedKeys,
      indeterminate: !!checkedKeys.length && checkedKeys.length < privateArr.length,
      checkAll: checkedKeys.length === privateArr.length
    });
  };

  const onCheckAllChange = e => {
    store.update({
      checkedList: e.target.checked ? privateArr : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  return <Modal
    visible={configVisible}
    title="权限配置"
    width={860}
    onCancel={onCancel}
    onOk={onOk}
    className={style['config-modal']}
  >
    <Form autoComplete="off" {...formProps}>
      {genItems(formItems, form)}
      <Row>
        <Col span={12}>
          <h1>
            操作权限
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              className={style['chack-all']}
            >
              全选
            </Checkbox>
          </h1>
          <div className={style['tree-wrap']}>
            <Tree
              checkable
              onCheck={onCheck}
              checkedKeys={checkedList}
            >
              {
                Nodes
              }
            </Tree>
          </div>
        </Col>
        <Col span={12}>
          <div className={style['tree-wrap']}>
            <TreeInfo store={store} />
          </div>
        </Col>
      </Row>
    </Form>
  </Modal>;
}));

export default Form.create()(config);

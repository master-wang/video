import React, { useCallback } from 'react';
import {
  List, Card, Pagination, Button,
  Icon, Modal, Checkbox
} from 'antd';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { toJS } from 'mobx';
import { useOperateTable, useRouter, useImgScale } from '@/hooks';
import SearchForm from './catchInfo/SearchForm';
import styles from './index.module.less';

const { Item } = List;
const { Group: CheckboxGroup } = Checkbox;

function indexRight({ store }) {
  const { query } = useRouter();
  // 图片放大的弹窗
  const { createModal } = useImgScale({ store });
  const { personid } = query;
  const { dataSource, pagination, loading } = store;
  const {
    current, total, pageSize, pageSizeOptions
  } = pagination;

  const showTotal = (totals) => (`共 ${totals} 个结果`);

  // 分页的信息改变的时候
  const onPagChange = async (page, nowPageSize) => {
    const newPage = {
      current: page,
      pageSize: nowPageSize
    };
    await store.update({
      pagination: { ...pagination, ...newPage }
    });
    store.queryPaging();
  };

  const { onDelete } = useOperateTable(store);

  const _onDelete = useCallback(() => {
    Modal.confirm({
      icon: <Icon type="info-circle" theme="filled" />,
      title: '确认要删除所有选中记录吗',
      okButtonProps: {
        type: 'danger'
      },
      onOk: async () => {
        const pas = {
          personid,
          faceids: toJS(store.selectedRowKeys)
        };
        await store.delete(pas);
        store.update({ selectedRowKeys: [] });
        store.queryPaging({
          pagination: { current: 1 }
        });
      }
    });
  }, [onDelete]);

  const onChange = (keys) => {
    store.update({ selectedRowKeys: keys });
  };

  const allSelect = () => {
    if (store.selectedRowKeys.length === store.dataSource.length) {
      store.update({ selectedRowKeys: [] });
      return;
    }
    const arr = [];
    store.dataSource.slice().forEach((item) => {
      arr.push(item.faceid);
    });
    store.update({ selectedRowKeys: arr });
  };

  useMount(() => {
    store.queryPaging({
      query: { personid }
    });
  });

  // 图片的放大
  const showImgModal = (imgUrl) => {
    store.update({ imgUrl, imgVisible: true });
  };

  return (
    <div className={styles['index-right-wrap']}>
      <div className={styles['top-tool']}>
        <div className={styles['op-wrap']}>
          <Button type="primary" onClick={allSelect}>
            {store.selectedRowKeys.length === store.dataSource.length && store.selectedRowKeys.length ? '取消全选' : '全选'}
          </Button>
          <Button
            disabled={store.selectedRowKeys.length === 0}
            onClick={_onDelete}
          >
            删除
          </Button>
        </div>
        <div className={styles['search-wrap']}>
          <SearchForm store={store} />
        </div>
      </div>

      <CheckboxGroup onChange={onChange} value={store.selectedRowKeys}>
        <List
          className={styles['list-warp']}
          dataSource={dataSource}
          loading={loading}
          renderItem={item => {
            const {
              faceid, devicename, faceURL, similarity, timestamp,
              sceneURL
            } = item;
            return (
              <Item key={faceid}>
                <Card>
                  <div className={styles['imp-wrap']}>
                    <img
                      src={faceURL}
                      alt="人脸"
                      className={styles['item-img']}
                      onClick={() => showImgModal(sceneURL)}
                    />
                    <span className={styles['img-degree']}>
                      { similarity ? Number(similarity).toFixed(2) * 100 : '-'}
                    %
                    </span>
                    <Checkbox value={faceid} key={faceid}></Checkbox>
                  </div>
                  <div className={styles['item-area']}>
                    {devicename}
                  </div>
                  <div className={styles['item-channelName']}>
                    {timestamp}
                  </div>
                </Card>
              </Item>
            );
          }}
        />
      </CheckboxGroup>
      {
        dataSource.length !== 0 ? <Pagination
          showQuickJumper
          showSizeChanger
          current={current}
          defaultPageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          total={total}
          onChange={onPagChange}
          onShowSizeChange={onPagChange}
          showTotal={showTotal}
          className={styles['index-right-pagi']}
        /> : <span />
      }
      {/* 单张图片的弹窗 */}
      { createModal() }
    </div>
  );
}

export default observer(indexRight);

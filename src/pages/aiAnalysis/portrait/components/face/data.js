import React from 'react';
import {
  List, Card, Pagination
} from 'antd';
import { observer } from 'mobx-react';
// import { useMount } from 'react-use';
import Actionmodal from './Actionmodal';
import styles from './index.module.less';

const { Item } = List;

function indexRight({ store }) {
  // useMount(() => {
  // });

  const { dataSource, pagination, loading } = store;
  const { current, total, pageSize } = pagination;

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

  // 弹窗详情
  const showModal = async ({ resultId }) => {
    await store.getResult({ resultId });
    store.update({ visible: true });
  };

  return (
    <div className={styles['index-right-wrap']}>
      {
        dataSource.length !== 0 ? <div>{`共查询到${total}个结果`}</div> : null
      }
      <List
        grid={{
          gutter: 0,
          lg: 4,
          xl: 7,
          xxl: 7
        }}
        dataSource={dataSource}
        loading={loading}
        renderItem={item => {
          const {
            url, name, facedbName, resultId, similarity
          } = item;
          return (
            <Item key={resultId}>
              <Card onClick={() => showModal({ resultId })}>
                <div className={styles['imp-wrap']}>
                  <img src={url} alt="人脸" className={styles['item-img']} />
                  <span className={styles['img-degree']}>
                    {`${similarity}`.includes('.') ? `${similarity}`.split('.')[1] : Number(`${similarity}`) * 100}
                    %
                  </span>
                </div>
                <div className={styles['item-area']}>
                  {name}
                </div>
                <div className={styles['item-channelName']}>
                  {facedbName}
                </div>
              </Card>
            </Item>
          );
        }}
      />
      {
        dataSource.length !== 0 ? <Pagination
          showQuickJumper
          showSizeChanger
          current={current}
          defaultPageSize={pageSize}
          total={total}
          onChange={onPagChange}
          onShowSizeChange={onPagChange}
          showTotal={showTotal}
          className={styles['index-right-pagi']}
        /> : <span />
      }
      {/* 人脸对比详情 */}
      <Actionmodal store={store} />
    </div>
  );
}

export default observer(indexRight);

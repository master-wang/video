import React from 'react';
import { observer } from 'mobx-react';
import {
  List, Card, Pagination, Popconfirm, Icon
} from 'antd';
import { useMount, useUnmount } from 'react-use';
import moment from 'moment';
import { useRouter, useOperateTable } from '@/hooks';
import styles from './index.module.less';

const { Item } = List;

export default observer(({ store }) => {
  // eslint-disable-next-line no-unused-vars
  const { pagination, dataSource, loading } = store;
  const {
    current, pageSize, total
  } = pagination;
  const { push } = useRouter();
  const { onDelete } = useOperateTable(store);
  const onChange = (page, pageSizeNum) => {
    store.update({
      pagination: {
        ...pagination,
        current: page,
        pageSize: pageSizeNum
      }
    });
    if (store.fileList.length) {
      store.getDataByImg();
    } else {
      store.queryPaging();
    }
  };

  const goDetail = (personid) => {
    const path = {
      path: '/aiAnalysis/archives/detail',
      query: {
        personid
      }
    };
    push(path);
  };
  const onDeleteImg = async (params) => {
    await onDelete(params);
    if (store.fileList.length) {
      store.getDataByImg();
    }
  };

  useMount(() => {
    store.queryPaging();
  });
  useUnmount(() => {
    store.update({ fileList: [] });
  });

  return (
    <div className={styles['db-wrap']}>
      <List
        className={styles['list-warp']}
        dataSource={dataSource}
        loading={loading}
        // pagination={{
        //   total,
        //   current,
        //   pageSize,
        //   showSizeChanger: true,
        //   showQuickJumper: true,
        //   position: 'bottom',
        //   showTotal: (totals) => `一共 ${totals} 条`,
        //   onChange,
        //   onShowSizeChange: onChange
        // }}
        renderItem={item => {
          const {
            personid, name, faceUrl, similarity, male,
            age, faceNum, updateTime, status, catchChannel
          } = item;
          return (
            <Item key={personid}>
              <Card>
                <div className={styles['card-wrap']}>
                  <Popconfirm
                    title="确定删除此档案,删除档案后无法恢复，你还要继续吗？"
                    onConfirm={() => onDeleteImg({ personid })}
                  >
                    <Icon type="close" className={styles['close-btn']} />
                  </Popconfirm>

                  <div className={styles['imp-wrap']}>
                    <img src={faceUrl} alt="人脸" className={styles['item-img']} onClick={() => goDetail(personid)} />
                    {
                      !status ? null : <span className={styles['img-degree']}>
                        { similarity ? Number(similarity).toFixed(2) * 100 : '-'}
                        %
                      </span>
                    }

                  </div>
                  <div className={styles['item-area']}>
                    <p className={styles['item-name']}>{name || '未知'}</p>
                    <div className={styles['item-p-wrap']}>
                      <p>
                        性别：
                        {male === '1' ? '男' : male === '0' ? '-' : '女'}
                      </p>
                      <p>
                        年龄：
                        {age || '-'}
                      </p>
                      <p>
                        抓拍归档数：
                        {faceNum || '-'}
                      </p>
                      <p>
                        抓拍地点：
                        {catchChannel}
                      </p>
                      <p>
                        更新时间：
                        {moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}
                      </p>
                    </div>

                  </div>
                </div>
              </Card>
            </Item>
          );
        }}
      />
      <div className={styles['pagination-wrap']}>
        <div style={{ width: '350px', height: '10px' }}></div>
        {
          dataSource.length ? <Pagination
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger
            showQuickJumper
            showTotal={(totals) => `一共 ${totals} 条`}
            onChange={onChange}
            onShowSizeChange={onChange}
          /> : null
        }

      </div>

    </div>
  );
});

import React, { useState } from 'react';
import {
  List, Card, Pagination, Modal, Button
} from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { useToolTip } from '../../hooks';
import ENUMS from '../../constants/enums';
import styles from './index.module.less';

const { Item } = List;

function indexRight({ store }) {
  useMount(() => {
    store.queryPaging({
      query: {
        dbType: '1',
        startTime: moment('00:00:00', 'HH:mm:ss').subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment('23:59:59', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
        pageInfo: {
          pageNumber: store.pagination.current,
          pageSize: store.pagination.pageSize,
          total: null
        }
      }
    });
  });

  const { dataSource, pagination } = store;
  const {
    current, total, pageSize, pageSizeOptions
  } = pagination;

  // 控制弹窗的变量
  const [modelVisible, setModelVisible] = useState(false);
  // 弹窗详情数据
  const [modelInfo, setModelInfo] = useState({});
  const {
    url: modelInfoUrl, time: modelInfoTime, channelName: modelInfoChannel,
    carNum, carType, colour
  } = modelInfo;

  // 控制图片的缩放 sx: x轴的缩放比例，sy： y轴的缩放比例，tx:x轴的偏移量，ty： y轴的偏移量
  const [ctlImgFig, setCtlImgFig] = useState({
    sx: 1, sy: 1, tx: 0, ty: 0
  });
  const {
    sx, sy, tx, ty
  } = ctlImgFig;

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
    store.queryPaging({
      query: {
        ...store.query,
        pageInfo: {
          current: store.pagination.current,
          pageSize: store.pagination.pageSize,
          total: null
        }
      }
    });
  };

  // 弹窗详情
  const showModal = (faceinfo) => {
    setModelInfo(faceinfo);
    setModelVisible(true);
  };

  // 取消弹窗
  const handleCancel = () => {
    setModelVisible(false);
    // 清楚图片的推拽放大信息
    setCtlImgFig({
      sx: 1, sy: 1, tx: 0, ty: 0
    });
  };

  // 放大图片
  const showBig = () => {
    if (sx >= 1) {
      const {
        sx: sxtemp, sy: sytemp
      } = ctlImgFig;
      setCtlImgFig({
        ...ctlImgFig,
        ...{ sx: sxtemp + 1, sy: sytemp + 1 }
      });
      // console.log(sxtemp + 1, sytemp + 1);
      document.getElementById('imgRed').style.transform = `scale(${sxtemp + 1}, ${sytemp + 1})`;
    }
  };
  // 缩小图片
  const showSmal = () => {
    if (sx > 1) {
      const {
        sx: sxtemp, sy: sytemp
      } = ctlImgFig;
      setCtlImgFig({
        ...ctlImgFig,
        ...{ sx: sxtemp - 1, sy: sytemp - 1 }
      });
      // console.log(sxtemp - 1, sytemp - 1);
      document.getElementById('imgRed').style.transform = `scale(${sxtemp - 1}, ${sytemp - 1})`;
    }
  };
  // 移动图片
  const moveImg = (e) => {
    const {
      tx: txtemp, ty: tytemp
    } = ctlImgFig;
    const event = e || window.event;
    const nowX = event.clientX - txtemp;
    const nowY = event.clientY - tytemp;
    document.onmousemove = (ev) => {
      setCtlImgFig({
        ...ctlImgFig,
        ...{
          tx: ev.clientX - nowX,
          ty: ev.clientY - nowY
        }
      });
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmousedown = null;
    };
  };

  const handleScroll = (e) => {
    if (e.nativeEvent.deltaY <= 0) {
      showSmal();
    } else {
      showBig();
    }
  };

  return (
    <div className={styles['index-right-wrap']}>
      <List
        className={styles['data-list-wrap']}
        grid={{
          gutter: 0,
          lg: 4,
          xl: 6,
          xxl: 6
        }}
        dataSource={dataSource}
        renderItem={item => {
          const {
            faceUrl, eventName, time, channelName, id
          } = item;
          return (
            <Item key={id}>
              <Card onClick={() => showModal(item)}>
                <div>
                  <img src={faceUrl} alt="人脸" className={styles['item-img']} />
                </div>
                <div className={styles['item-area']}>
                  {useToolTip({ title: eventName, limit: 12 })}
                </div>
                <div className={styles['item-channelName']}>
                  {useToolTip({ title: channelName, limit: 12 }) || '-'}
                </div>
                <div className={styles['item-time']}>
                  {time}
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
          pageSizeOptions={pageSizeOptions}
          total={total}
          onChange={onPagChange}
          onShowSizeChange={onPagChange}
          showTotal={showTotal}
          className={styles['index-right-pagi']}
        /> : <span />
      }
      <Modal
        title="车辆详情"
        width={800}
        visible={modelVisible}
        onCancel={handleCancel}
        footer={null}
        className={styles['index-right-modal']}
      >
        <div>
          <div className={styles['modal-left']}>
            <div className={styles['adjust-img-wrap']} onWheel={(e) => handleScroll(e)}>
              <div
                onMouseDown={() => moveImg()}
                className={styles['modal-left-img']}
                id="imgRed"
                style={{
                  transform: `scale(${sx}, ${sy})`, left: `${tx}px`, top: `${ty}px`, backgroundImage: `url(${modelInfoUrl})`
                }}
              />
              <div className={styles['img-control-wrap']}>
                <Button className={styles['img-control-btn']} onClick={showBig}>+</Button>
                <Button className={styles['img-control-btn']} onClick={showSmal}>-</Button>
              </div>
            </div>
          </div>
          <div className={styles['modal-right']}>
            <div>识别结果</div>
            <div className={styles['modal-right-lable']}>
              <div className={styles['lable-left']}>车牌号码：</div>
              <div className={styles['lable-right']}>{carNum || '-'}</div>
            </div>
            <div className={styles['modal-right-lable']}>
              车辆类型：
              {carType || '-'}
            </div>
            <div className={styles['modal-right-lable']}>
              车身颜色：
              {_.get(ENUMS.CAR_COLOR.keyMap[colour], 'name') || '-'}
            </div>
            <div className={styles['modal-right-channel']}>
              抓拍通道：
              {modelInfoChannel}
            </div>
            <div className={styles['modal-right-time']}>
              抓拍时间：
              {modelInfoTime}
            </div>
            <div className={styles['modal-right-lable']}>
              行驶方向：
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default observer(indexRight);

import React, { useState } from 'react';
import {
  List, Card, Pagination, Modal, Button
} from 'antd';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useToolTip } from '../../hooks';
import FacePageStore from '../../stores/record';
import styles from './index.module.less';

const { Item } = List;

function indexRight() {
  useMount(() => {
    FacePageStore.setLastQueryParams();
    FacePageStore.queryFaceList();
  });

  const { faceList, pagination } = FacePageStore;
  const {
    current, total, pageSize, pageSizeOptions
  } = pagination;

  // 控制弹窗的变量
  const [modelVisible, setModelVisible] = useState(false);
  // 弹窗详情数据
  const [modelInfo, setModelInfo] = useState({});
  const {
    url: modelInfoUrl, time: modelInfoTime, channelName: modelInfoChannel,
    faceUrl: smallImg, sex, age
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
    await FacePageStore.update({
      pagination: { ...pagination, ...newPage }
    });
    FacePageStore.queryFaceList();
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
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 8,
          xxl: 8
        }}
        dataSource={faceList}
        renderItem={item => {
          const {
            faceUrl, time, channelName
          } = item;
          return (
            <Item>
              <Card onClick={() => showModal(item)}>
                <div>
                  <img src={faceUrl} alt="人脸" className={styles['item-img']} />
                </div>
                <div className={styles['item-channelName']}>
                  {useToolTip({ title: channelName, limit: 12 }) || '未知'}
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
        faceList.length !== 0 ? <Pagination
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
        title="人脸详情"
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
                // src={modelInfoUrl}
                // alt="人脸详情"
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
            <div>
              <img src={smallImg} alt="人脸详情" className={styles['modal-right-img']} />
            </div>
            <div className={styles['modal-right-time']}>
              性别：
              {_.get(ENUMS.SEX.keyMap[sex], 'name') || '-'}
            </div>
            <div className={styles['modal-right-time']}>
              年龄：
              {age || '-'}
            </div>
            <div className={styles['modal-right-channel']}>
              通道名称：
              {modelInfoChannel}
            </div>
            <div className={styles['modal-right-time']}>
              创建时间：
              {modelInfoTime}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default observer(indexRight);

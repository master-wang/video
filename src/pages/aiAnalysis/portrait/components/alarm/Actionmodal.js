import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Divider, Icon, List
} from 'antd';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useImgScale } from '@/hooks';
import style from './index.module.less';


export default observer(({ store }) => {
  const {
    visible, detailLoading, moreFaceList = [], monitorLogInfo = {}
  } = store;
  // 图片放大的弹窗
  const { createModal } = useImgScale({ store });
  const { length } = moreFaceList;
  const maxWidth = length * 150;
  const [clickInfo, setClickInfo] = useState({});
  const ulRef = useRef();
  // 控制图片ul左移的单位 默认20
  const [left, setLeft] = useState(20);
  const handleCancel = () => {
    store.update({ visible: false });
    if (!store.detailLoading) {
      ulRef.current.style.left = '20px';
    }
    setLeft(20);
    setClickInfo({});
  };
  const ulMoveRight = () => {
    const newLeft = left - 150;
    if (maxWidth + left > 950) {
      setLeft(newLeft);
    }
    ulRef.current.style.left = `${newLeft}px`;
  };
  const ulMoveLeft = () => {
    const newLeft = left + 150;
    if (left < 20) {
      setLeft(newLeft);
    }
    if (left === 20) {
      return;
    }
    ulRef.current.style.left = `${newLeft}px`;
  };

  // 点击更多照片得时候
  const changeImg = (params) => {
    setClickInfo(params);
  };

  // 图片的放大
  const showImgModal = (imgUrl) => {
    store.update({ imgUrl, imgVisible: true });
  };
  const similar = clickInfo.similarity || monitorLogInfo.similarity;
  return (
    <Modal
      title="人脸对比详情"
      visible={visible}
      onCancel={handleCancel}
      width={860}
      className={style['modal-wrap']}
      footer={null}
    >
      <div className={style['modal-left']}>
        <div className={style['img-item']}>
          <img
            style={{ cursor: 'pointer' }}
            src={clickInfo.catchFace || monitorLogInfo.catchFace}
            alt="抓拍人脸"
            onClick={() => showImgModal(clickInfo.catchScene || monitorLogInfo.catchScene)}
          />
          <div>抓拍人脸</div>
        </div>
        <div className={style['img-middle']}>
          <div className={style['img-similar']}>
            {`${similar}`.includes('.') ? `${similar}`.split('.')[1] : Number(`${similar}`) * 100}
                  %
          </div>
        </div>
        <div className={style['img-item']}>
          <img src={monitorLogInfo.originFace} alt="布控人脸" />
          <div>布控人脸</div>
        </div>
      </div>
      <div className={style['modal-right']}>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>姓名：</div>
          <div className={style['lable-right']}>{monitorLogInfo.name}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>性别：</div>
          <div className={style['lable-right']}>{_.get(ENUMS.SEX.keyMap[monitorLogInfo.male], 'name')}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>证件类型：</div>
          <div className={style['lable-right']}>{_.get(ENUMS.CARDTYPE.keyMap[monitorLogInfo.cardType], 'name')}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>证件号码：</div>
          <div className={style['lable-right']}>{monitorLogInfo.cardNumber}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>抓拍时间：</div>
          <div className={style['lable-right']}>{monitorLogInfo.catchTime}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>户籍地址：</div>
          <div className={style['lable-right']}>{monitorLogInfo.permanentAddress || '未知'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>现住地址：</div>
          <div className={style['lable-right']}>{monitorLogInfo.currentAddress || '未知'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>所属人口库：</div>
          <div className={style['lable-right']}>{monitorLogInfo.facedbName}</div>
        </div>
      </div>
      <Divider />
      <div>更多人脸匹配的结果</div>
      <div className={style['rotate-wrap']}>
        {
          detailLoading ? <List
            dataSource={[]}
            loading
            className={style['enpty-list']}
          /> : <div>
            <div className={style['list-wrap']}>
              <ul ref={ulRef} style={{ width: `${maxWidth}px` }}>
                {
            length ? moreFaceList.slice().map(({
              catchFace, similarity, catchTime, channelName, catchScene
            }, index) => <li
              key={index + 1}
              onClick={() => changeImg({
                catchFace, similarity, key: index + 1, catchScene
              })}
              className={clickInfo.key && `${clickInfo.key}` === `${index + 1}` ? style['click-li'] : null}
            >
              <div className={style['imp-wrap']}>
                <img src={catchFace} alt="人脸" className={style['item-img']} />
                <span className={style['img-degree']}>
                  {`${similarity}`.includes('.') ? `${similarity}`.split('.')[1] : Number(`${similarity}`) * 100}
                  %
                </span>
              </div>
              <div className={style['item-area']}>
                {channelName || '未知'}
              </div>
              <div className={style['item-channelName']}>
                {catchTime || '未知'}
              </div>
            </li>) : <List
              dataSource={[]}
              className={style['enpty-list']}
            />
          }
              </ul>
            </div>
            {
          length > 5 ? <div>
            <Icon type="left" className={style['left-control']} onClick={ulMoveRight} />
            <Icon type="right" className={style['right-control']} onClick={ulMoveLeft} />
          </div>
            : null
        }
          </div>
        }

      </div>
      {/* 单张图片的弹窗 */}
      { createModal() }
    </Modal>
  );
});

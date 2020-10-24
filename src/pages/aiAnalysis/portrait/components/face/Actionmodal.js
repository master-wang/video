import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Button } from 'antd';
import _ from 'lodash';
import style from './index.module.less';
import ENUMS from '../../constants/enums';


export default observer(({ store }) => {
  const { visible, detail } = store;
  const featResult = detail.featResult || {};
  const personInfo = detail.personInfo || {};
  const handleCancel = () => {
    store.update({ visible: false });
  };

  // 上一张、下一张的图片
  const changeItem = async ({ resultId: id, dir }) => {
    const indexItem = dir === 'pre' ? -1 : 1;
    const getIdObj = {
      resultId: ''
    };
    store.dataSource.forEach(({ resultId }, index) => {
      if (id === resultId) {
        // 获取上一张或者下一站的id
        const i = index + indexItem;
        if (i < 0) {
          getIdObj.resultId = store.dataSource[0].resultId;
        } else if (i >= store.dataSource.length) {
          getIdObj.resultId = store.dataSource[store.dataSource.length - 1].resultId;
        } else {
          getIdObj.resultId = store.dataSource[i].resultId;
        }
      }
    });
    await store.getResult({ resultId: getIdObj.resultId });
  };
  return (
    <Modal
      title="人脸对比详情"
      visible={visible}
      onCancel={handleCancel}
      width={860}
      destroyOnClose
      className={style['modal-wrap']}
      footer={<div>
        <Button onClick={() => changeItem({ resultId: featResult.resultId, dir: 'pre' })}>上一张</Button>
        <Button onClick={() => changeItem({ resultId: featResult.resultId, dir: 'next' })}>下一张</Button>
      </div>}
    >
      <div className={style['modal-left']}>
        <div className={style['img-item']}>
          <img src={featResult.originUrl} alt="检索图片" />
          <div>检索图片</div>
        </div>
        <div className={style['img-middle']}>
          <div className={style['img-similar']}>
            {`${featResult.similarity}`.includes('.') ? `${featResult.similarity}`.split('.')[1] : Number(`${featResult.similarity}`) * 100}
            %
          </div>
        </div>
        <div className={style['img-item']}>
          <img src={personInfo.faceStream} alt="检索结果" />
          <div>检索结果</div>
        </div>
      </div>
      <div className={style['modal-right']}>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>姓名：</div>
          <div className={style['lable-right']}>{personInfo.name}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>性别：</div>
          <div className={style['lable-right']}>{_.get(ENUMS.SEX.keyMap[personInfo.male], 'name')}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>证件类型：</div>
          <div className={style['lable-right']}>{_.get(ENUMS.CARDTYPE.keyMap[personInfo.cardType], 'name')}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>证件号：</div>
          <div className={style['lable-right']}>{personInfo.cardNumber}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>名族：</div>
          <div className={style['lable-right']}>{personInfo.nationality}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>户籍地址：</div>
          <div className={style['lable-right']}>{personInfo.permanentAddress || '未知'}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>所属人口库：</div>
          <div className={style['lable-right']}>{personInfo.facedbName}</div>
        </div>
        <div className={style['modal-right-lable']}>
          <div className={style['lable-left']}>创建时间：</div>
          <div className={style['lable-right']}>{personInfo.timestamp}</div>
        </div>
      </div>
    </Modal>
  );
});

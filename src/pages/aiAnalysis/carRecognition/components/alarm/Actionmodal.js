import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, Radio, Descriptions
} from 'antd';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { genItems } from '@/utils/form';
import { useImgScale } from '../../hooks';
import style from './index.module.less';

const { Group } = Radio;
const { Item } = Descriptions;

export default Form.create()(observer(({ form, store }) => {
  const { visible, alarmItem } = store;
  // 图片放大的弹窗
  const { createModal } = useImgScale({ store });

  const handleCancel = () => {
    store.update({ visible: false, alarmItem: {} });
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      await store.updateLog({ ...values, id: store.alarmId });
      store.queryPaging();
      handleCancel();
    });
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
  const topItem = [{
    key: 'alarmCheck',
    decorator: {
      initialValue: alarmItem.alarmCheck || '',
      rules: [
        { required: true, message: '请选择' }
      ]
    },
    component: <Group>
      <Radio style={radioStyle} value="0"> 正报 </Radio>
      <Radio style={radioStyle} value="1"> 误报 </Radio>
    </Group>
  }];
  const bottomItem = [{
    key: 'licenseCheck',
    decorator: {
      initialValue: alarmItem.licenseCheck || '',
      rules: [
        { required: true, message: '请选择' }
      ]
    },
    component: <Group>
      <Radio style={radioStyle} value="0"> 正报 </Radio>
      <Radio style={radioStyle} value="1"> 误报 </Radio>
    </Group>
  }];

  const showImgModal = (imgUrl) => {
    store.update({ imgUrl, carVisible: true });
  };

  return (
    <Modal
      title="告警详情"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={860}
      className={style['modal-wrap']}
    >
      <div className={style['caritem-wrap']}>
        <div className={style['form-left']}>
          <div className={style['car-info']}>
            <div className={style['img-wrap']}>
              <img src={alarmItem.catchCar} alt="图片" onClick={() => showImgModal(alarmItem.catchScene)} />
              <span>抓拍车辆</span>
            </div>
            <div className={style['img-detail']}>
              <Descriptions title="识别结果" column={2}>
                <Item label="车牌号码">{alarmItem.catchCardNumber}</Item>
                <Item label="抓拍通道">{alarmItem.channelName}</Item>
                <Item label="车辆类型">{alarmItem.catchCarType}</Item>
                <Item label="抓拍时间">{alarmItem.catchTime}</Item>
                <Item label="车身颜色">{_.get(ENUMS.CAR_COLOR.keyMap[alarmItem.catchColour], 'name')}</Item>
                {/* <Item label="行驶方向"></Item> */}
              </Descriptions>
            </div>
          </div>
          <div className={style['car-info']}>
            <div className={style['img-wrap']}>
              <img src={alarmItem.originCar} alt="图片" />
              布控车辆
            </div>
            <div className={style['img-detail']}>
              <Descriptions title="车辆基本信息" column={2}>
                <Item label="车牌号码">{alarmItem.originCardNumber}</Item>
                <Item label="车辆品牌">{_.get(ENUMS.CAR_BRAND.keyMap[alarmItem.originCarBrand], 'name')}</Item>
                <Item label="车辆类型">{_.get(ENUMS.CAR_TYPE.keyMap[alarmItem.originCarType], 'name')}</Item>
                <Item label="所属车辆库">{alarmItem.carDbName}</Item>
                <Item label="车身颜色">{_.get(ENUMS.CAR_COLOR.keyMap[alarmItem.originColour], 'name')}</Item>
              </Descriptions>
            </div>
          </div>
        </div>
        <div className={style['form-right']}>
          {genItems(topItem, form)}
        </div>
      </div>
      <div className={style['caritem-wrap']}>
        <div className={style['form-left']}>
          <div className={style['bottom-wrap']}>
            <div className={style['item-title']}>判断结果</div>
            <div>
              是否套牌车：
              {alarmItem.licenseCheck === '0' ? '是' : '否'}
            </div>
          </div>
        </div>
        <div className={style['form-right']}>
          {genItems(bottomItem, form)}
        </div>
      </div>
      {/* 单张图片的弹窗 */}
      { createModal() }
    </Modal>
  );
}));

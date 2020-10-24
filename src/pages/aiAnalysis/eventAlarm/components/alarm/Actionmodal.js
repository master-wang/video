import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Form, Radio
} from 'antd';
import _ from 'lodash';
import ENUMS from '../../constants/enums';
import { useImgScale } from '@/hooks';
import { genItems } from '@/utils/form';
import style from './index.module.less';

const { Group } = Radio;

export default Form.create()(observer(({ form, store }) => {
  const { visible, alarmItem } = store;
  const { createModal } = useImgScale({ store });

  const handleCancel = () => {
    store.update({ visible: false, alarmItem: {} });
  };
  const handleOk = () => {
    form.validateFields(async (error, values) => {
      if (error) {
        return;
      }
      await store.updateLog({ ...values, id: store.id });
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
    key: 'checkResult',
    decorator: {
      initialValue: alarmItem.checkResult || '',
      rules: [
        { required: true, message: '必选项' }
      ]
    },
    component: <Group>
      <Radio style={radioStyle} value="0"> 正报 </Radio>
      <Radio style={radioStyle} value="1"> 误报 </Radio>
    </Group>
  }];

  const showImgModal = (imgUrl) => {
    store.update({ imgUrl, imgVisible: true });
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
            <div onClick={() => showImgModal(alarmItem.catchScene)}>
              <img
                src={alarmItem.catchScene}
                alt="告警全景"
                className={style['modal-left-img']}
              />
            </div>
            <div className={style['modal-right']}>
              <div className={style['modal-right-lable']}>
                <div className={style['lable-left']}>告警通道：</div>
                <div className={style['lable-right']}>{alarmItem.channelName}</div>
              </div>
              <div className={style['modal-right-lable']}>
              告警时间：
                {alarmItem.alarmTime}
              </div>
              <div className={style['modal-right-lable']}>
              事件类型：
                {_.get(ENUMS.TASK_TYPE.keyMap[alarmItem.eventType], 'name')}
              </div>
            </div>
          </div>
        </div>
        <div className={style['form-right']}>
          {genItems(topItem, form)}
        </div>
      </div>
      {/* 单张图片的弹窗 */}
      { createModal() }
    </Modal>
  );
}));

import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Descriptions } from 'antd';
import styles from './index.module.less';


export default observer(({ store }) => {
  const handleCancel = () => {
    store.update({ detailVisible: false });
  };
  const handleOk = () => {
    handleCancel();
  };
  const { entries } = store;
  const lables = entries.alarmValue ? entries.alarmValue.split(':') : ['', ''];
  return (
    <Modal
      title="告警信息"
      visible={store.detailVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles['detail-modal']}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="服务器名称">{entries.deviceName || '-'}</Descriptions.Item>
        <Descriptions.Item label="告警内容">{entries.alarmInfo || '-'}</Descriptions.Item>
        <Descriptions.Item label={lables[0]}>{lables[1] || '-'}</Descriptions.Item>
        <Descriptions.Item label="告警时间">{entries.alarmTime || '-'}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});

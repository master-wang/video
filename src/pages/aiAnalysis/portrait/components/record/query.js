import React from 'react';
import { Collapse, Icon, Button } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import CaptureTime from '../common/CaptureTime';
import CaptureWay from '../common/CaptureWay';
import Cube from '../common/Cube';
import CheckCube from '../common/CheckCube';
import Cuboid from '../common/Cuboid';
import ColorSelect from '../common/ColorSelect';
import { faceQueryConfig } from '../../constants/index';
import FacePageStore from '../../stores/record';

import styles from './index.module.less';

const { Panel } = Collapse;

function query() {
  const panelChirld = (item, i) => {
    const { type } = item;
    switch (type) {
      case 'captureTime': return <CaptureTime item={item} key={i} store={FacePageStore} />;
      case 'captureWay': return <CaptureWay item={item} key={i} store={FacePageStore} />;
      case 'sex': return <Cube item={item} key={i} store={FacePageStore} />;
      case 'age': return <Cuboid item={item} key={i} store={FacePageStore} />;
      case 'hair': return <Cuboid item={item} key={i} store={FacePageStore} />;
      case 'bodilyForm': return <Cuboid item={item} key={i} store={FacePageStore} />;
      case 'color': return <ColorSelect item={item} key={i} store={FacePageStore} />;
      case 'accessory': return <CheckCube item={item} key={i} store={FacePageStore} />;
      default: return <div />;
    }
  };

  // 重置
  const reSet = () => {
    const { resetQueryParams, updateParams } = FacePageStore;
    // 重置查询参数
    resetQueryParams();
    // 更新时间为近三天
    updateParams({
      startTime: moment('00:00:00', 'HH:mm:ss').subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment('23:59:59', 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    });
    // 设置抓拍时间的天数
    FacePageStore.update({ ctDay: 3 });
  };

  // 查询
  const onSeach = async () => {
    const { setLastQueryParams, queryFaceList } = FacePageStore;
    await setLastQueryParams();
    queryFaceList({ pageInfo: { pageNumber: 1 } });
  };

  return (
    <div className={styles['indexLeft-wrap']}>
      <div className={styles['indexLeft-top']}>
        <Collapse
          defaultActiveKey="0"
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          {
          faceQueryConfig.map(({ title, chrld }, index) => (
            <Panel header={title} key={index}>
              {
                chrld.map((item, i) => panelChirld(item, i))
              }
            </Panel>
          ))
        }
        </Collapse>
      </div>
      <div className={styles['indexLeft-botom']}>
        <Button onClick={reSet}>重置</Button>
        <Button onClick={onSeach}>查询</Button>
      </div>

    </div>
  );
}

export default observer(query);

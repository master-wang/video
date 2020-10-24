import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import { useMount } from 'react-use';
import { useRouter } from '@/hooks';
import style from './index.module.less';

const { Option } = Select;

export default observer(({ store }) => {
  const { query: { id } } = useRouter();
  const { garageList } = store;
  const onChange = (val) => {
    store.update({ cardbId: val });
    store.queryPaging({ query: { dbTableName: val } });
  };
  // const goBack = () => {
  //   const path = {
  //     path: '/aiconfigs/cars'
  //   };
  //   push(path);
  // };
  useMount(() => {
    store.update({ cardbId: id });
  });
  return (<div className={style['tootop-wrap']}>
    <Select placeholder="请选择车辆库" onChange={onChange} style={{ width: 180 }} value={store.cardbId}>
      {
        garageList.map(({ cardbId, cardbName }) =>
          <Option key={cardbId} value={cardbId}>{cardbName}</Option>)
      }
    </Select>
    {/* <Button className={style.right} onClick={goBack}>返回</Button> */}
  </div>);
});

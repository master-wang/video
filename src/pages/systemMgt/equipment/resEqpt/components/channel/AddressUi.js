import React, { useEffect } from 'react';
import BMap from 'BMap';
import { observer } from 'mobx-react';
// import { useMount } from 'react-use';
import style from './AddressUi.module.less';

// const closeIconUrl = require('@/images/closeIcon.png');
const closeIconUrl = require('@/images/noClose.png');
const newIcon = require('@/images/yellow.png');

// 热力图的点数据，lng：点的经度 点的lat纬度 count：点的热力程度
// const points = [
//   { lng: 116.4043, lat: 39.9151, count: 50 },
//   { lng: 116.4044, lat: 39.9152, count: 100 },
//   { lng: 116.4045, lat: 39.9153, count: 70 },
//   { lng: 116.4046, lat: 39.9154, count: 2 }
// ];

export default observer(({ form, store }) => {
  /**
 * 添加点覆盖物
 * @param point 添加点
 * @param config 配置
 *  {
     img: '',//覆盖物图片,格式:url|Image。默认：imgCenter。
     size: [],//覆盖物图片尺寸,格式:[x,y]。默认：[22, 36]。
     offset: []//覆盖物图片偏移,格式:[x,y]
    }
 */
  const { entity } = store;
  useEffect(() => {
    const map = new BMap.Map('address', { enableMapClick: false }); // 创建Map实例
    if (entity.longitude && entity.latitude) {
      // eslint-disable-next-line max-len
      map.centerAndZoom(new BMap.Point(Number(entity.longitude), Number(entity.latitude)), 20);
      // 初始化地图,设置中心点坐标和地图级别
    } else {
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 20); // 初始化地图,设置中心点坐标和地图级别
    }

    // map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
    map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
    // const mapStyle = {
    //   features: [], // 隐藏地图上的"poi",'road', 'building', 'water', 'land'
    //   style: 'dark' // dark midnight
    // };
    // map.setMapStyle(mapStyle);
    map.setMapStyleV2({ styleJson: CST.styleJson });
    map.enableScrollWheelZoom();
    let preMarker = null;
    const size = [40, 40];
    const bSize = new BMap.Size(size[0], size[1]);
    const bOffset = new BMap.Size(0, -size[1] / 4);
    const icon = new BMap.Icon(newIcon, bSize);
    icon.setImageSize(bSize);
    const opts = {
      width: 315, // 信息窗口宽度
      height: 64, // 信息窗口高度,
      boxClass: style.template,
      closeIconUrl
    };
    const template = ({ lng, lat } = {}) => `<div>
    <div style="
      font-size: 12px;
      color: rgba(255,255,255,1);
      font-weight: bold;
    ">
      经度：${lng || ''}
    </div>
    <div style="
    font-size: 12px;
    color: rgba(255,255,255,1);
    font-weight: bold;
    ">
      纬度：${lat || ''}
    </div>
    <div style="
    font-size: 12px;
    color: rgba(255,255,255,1);
    font-weight: bold;
    ">
      点击自动填充坐标
    </div>
    <div style="
      position: absolute;
      width: 0;
      height: 0;
      text-align: center;
      line-height: 26px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid rgba(26,35,71,1);
      z-index: 1;
      margin-left: 40%;
      margin-top: -5px;
    "></div>
  </div>`;
    const infoWindow = new window.BMapLib.InfoBox(map, template(), opts); // 创建信息窗口对象
    let po = null;
    // 回显之前的图形
    if (entity.longitude) {
      map.removeOverlay(preMarker);
      // eslint-disable-next-line max-len
      const marker = new BMap.Marker(new BMap.Point(Number(entity.longitude), Number(entity.latitude)), { offset: bOffset, icon });
      preMarker = marker;
      map.addOverlay(marker);
    }

    map.addEventListener('click', (e) => {
      map.removeOverlay(preMarker);
      // eslint-disable-next-line max-len
      const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat), { offset: bOffset, icon });
      preMarker = marker;
      // infoWindow.setContent('nonk');
      infoWindow.open(marker);
      infoWindow.setContent(template(e.point));
      infoWindow.setPosition(new BMap.Point(e.point.lng, e.point.lat + 0.00001));
      const { setFieldsValue } = form;
      setFieldsValue({ longitude: `${e.point.lng}`, latitude: `${e.point.lat}` });
      map.addOverlay(marker);
    });
    map.addEventListener('mousemove', (e) => {
      const marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
      po = marker;
      infoWindow.close();
      infoWindow.open(marker);
      infoWindow.setContent(template(e.point));
      infoWindow.setPosition(new BMap.Point(e.point.lng, e.point.lat + 0.00001));
    });
    map.addEventListener('mouseout', () => {
      infoWindow.close(po);
    });

    // 热力图
    // const heatmapOverlay = new window.BMapLibHeat.HeatmapOverlay({
    //   // 热力图的每个点的半径大小
    //   radius: 20,
    //   // 热力的透明度0~1
    //   opacity: 0.8,
    //   // 其中 key 表示插值的位置0~1，value 为颜色值
    //   gradient: {
    //     0: 'rgb(102, 255, 0)',
    //     0.5: 'rgb(255, 170, 0)',
    //     1: 'rgb(255, 0, 0)'
    //   }
    // });
    // // 清除图层(每次重新调用需要清除上一个覆盖物图层)
    // // map.clearOverlays();
    // // 添加热力覆盖物
    // map.addOverlay(heatmapOverlay);
    // heatmapOverlay.setDataSet({ data: points, max: 100 });
    // // 显示热力图，隐藏为this.heatmapOverlay.hide();
    // heatmapOverlay.show();
  }, [entity]);
  return (
    <div className={style.address} id="address">
    </div>
  );
});

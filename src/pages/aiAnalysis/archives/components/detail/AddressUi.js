/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import BMap from 'BMap';
import { DatePicker, Button } from 'antd';
import { observer } from 'mobx-react';
import { useMount, useUnmount } from 'react-use';
import { toJS } from 'mobx';
import { useRouter } from '@/hooks';
import style from './AddressUi.module.less';

const { RangePicker } = DatePicker;

const olderIcon = require('@/images/green.png');
const newIcon = require('@/images/yellow.png');
const closeIconUrl = require('@/images/closeIcon.png');

const Wailing = require('@/images/Walking.png');

export default observer(({ store }) => {
  const { locations } = store;
  const { query } = useRouter();
  const { personid } = query;
  const [time, setTime] = useState(null);
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
  const addPoint = (map, point, config = {}, item) => {
    const {
      img, size = [40, 40], offset
    } = config;
    const bSize = new BMap.Size(size[0], size[1]);
    const bOffset = offset ? new BMap.Size(offset[0], offset[1]) : new BMap.Size(0, -size[1] / 4);

    const icon = new BMap.Icon(img, bSize);
    icon.setImageSize(bSize);
    // 创建标注。使用自定义图标时，标注的地理坐标点将位于标注所用图标的中心位置。
    const marker = new BMap.Marker(point, { offset: bOffset, icon });
    marker.addEventListener('mouseover', (e) => { // 点击事件
      if (!e.overlay) {
        const newI = new BMap.Icon(newIcon, bSize);
        newI.setImageSize(bSize);
        marker.setIcon(newI);
      }
    });
    marker.addEventListener('mouseout', (e) => { // 点击事件
      if (!e.overlay) {
        const newI = new BMap.Icon(img, bSize);
        newI.setImageSize(bSize);
        marker.setIcon(newI);
      }
    });
    const opts = {
      width: 315, // 信息窗口宽度
      height: 64, // 信息窗口高度,
      boxClass: style.template,
      closeIconUrl
    };
    const template = `<div>
      <div style="
        font-size: 12px;
        color: rgba(255,255,255,1);
        font-weight: bold;
      ">
        时间：${item.timestamp}
      </div>
      <div style="
      font-size: 12px;
      color: rgba(255,255,255,1);
      font-weight: bold;
      ">
        地点：${item.channelName}
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
        margin-top: 1px;
      "></div>
    </div>`;
    const infoWindow = new window.BMapLib.InfoBox(map, template, opts); // 创建信息窗口对象
    marker.addEventListener('click', () => {
      infoWindow.open(marker);
      infoWindow.setPosition(new BMap.Point(point.lng, point.lat + 0.0001));
    });
    // infoWindow.open(marker);
    // infoWindow.setPosition(new BMap.Point(point.lng, point.lat + 0.0001));
    map.addOverlay(marker);
    return marker;
  };

  const linear = (initPos, targetPos, currentCount, count) => {
    const b = initPos;
    const c = targetPos - initPos;
    const t = currentCount;
    const d = count;
    // eslint-disable-next-line no-mixed-operators
    return c * t / d + b;
  };


  let i = 0;
  let point = null;
  let point2 = null;
  let interId = null;
  const moveCar = (prvePoint, newPoint, timer, marker, count, points, setTimeFun) => {
    let _prvePoint = new BMap.Pixel(0, 0); // Pixel表示地图上的一个点，单位为像素
    let _newPoint = new BMap.Pixel(0, 0);
    let currentCount = 0;// 当前帧数
    const projection = new BMap.MercatorProjection();
    _prvePoint = projection.lngLatToPoint(prvePoint);
    _newPoint = projection.lngLatToPoint(newPoint);
    const intervalFlag = setInterval(() => {
      if (currentCount >= count) {
        clearInterval(intervalFlag);
        if (points[i + 1]) {
          i = ++i;
          point = points[i];
          point2 = points[i + 1];
          if (!point2) {
            i = 0;
            // eslint-disable-next-line prefer-destructuring
            point = points[0];
            // eslint-disable-next-line prefer-destructuring
            point2 = points[1];
            setTimeout(setTimeFun, 3000);
            return;
          }
          setTimeout(setTimeFun, 0);
        }
      } else {
        currentCount++;// 计数
        const x = linear(_prvePoint.x, _newPoint.x, currentCount, count);
        const y = linear(_prvePoint.y, _newPoint.y, currentCount, count);
        const pos = projection.pointToLngLat(new BMap.Pixel(x, y));
        marker.setPosition(pos);
        // setRotation(prvePoint, newPoint, marker);
      }
    }, timer);
    interId = intervalFlag;
  };

  const run = ({ map, points, config = {} }) => {
    const {
      img, size = [40, 40], offset
    } = config;
    const bSize = new BMap.Size(size[0], size[1]);
    const bOffset = offset ? new BMap.Size(offset[0], offset[1]) : new BMap.Size(0, -size[1] / 4);

    const icon = new BMap.Icon(img, bSize);
    icon.setImageSize(bSize);

    if (!points.length) {
      return;
    }
    // eslint-disable-next-line prefer-destructuring
    point = points[0];
    // eslint-disable-next-line prefer-destructuring
    point2 = points.length === 1 ? points[0] : points[1];
    // 创建标注。使用自定义图标时，标注的地理坐标点将位于标注所用图标的中心位置。
    const marker = new BMap.Marker(point, { offset: bOffset, icon });
    map.addOverlay(marker);
    const setTimeFun = () => {
      const fun = async () => {
        await moveCar(point, point2, 20, marker, 100, points, setTimeFun);
      };
      fun();
    };
    setTimeout(setTimeFun, 0);
  };


  useMount(() => {
    // 查询数据
    store.getlocation({ personid });
  });

  useUnmount(() => {
    i = 0;
    point = null;
    point2 = null;
    clearInterval(interId);
  });

  useEffect(() => {
    const map = new BMap.Map('address'); // 创建Map实例
    if (!locations.length) {
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 20);
    } else {
      // eslint-disable-next-line max-len
      map.centerAndZoom(new BMap.Point(Number(locations[0].longitude), Number(locations[0].latitude)), 20); // 初始化地图,设置中心点坐标和地图级别
    }

    // map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
    map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
    // const mapStyle = {
    //   features: [], // 隐藏地图上的"poi",'road', 'building', 'water', 'land'
    //   style: 'dark' // dark midnight
    // };
    // map.setMapStyle(mapStyle);
    map.setMapStyleV2({ styleJson: CST.styleJson });
    map.enableScrollWheelZoom(true);
    // 遍历数据
    const points = [];
    locations.sort((a, b) => Date.parse(a.timestamp.replace(/-/g, '/')) - Date.parse(b.timestamp.replace(/-/g, '/')));
    locations.forEach((item) => {
      addPoint(map, new BMap.Point(Number(item.longitude), Number(item.latitude)), {
        img: olderIcon
      }, item);
      points.push(new BMap.Point(Number(item.longitude), Number(item.latitude)));
    });
    // 点去除相邻的相同点
    for (let j = 0; j < points.length - 1; j++) {
      let count = 0;
      // eslint-disable-next-line max-len
      for (let k = j; k < points.length - 1 && points[k].lat === points[k + 1].lat && points[k].lng === points[k + 1].lng; k++) {
        count++;
      }
      points.splice(j, count);
    }

    const polyline = new BMap.Polyline(points, {
      strokeStyle: 'dashed', strokeColor: '#FFFFFF', strokeWeight: 4
    });
    map.addOverlay(polyline);
    // 轨迹运动
    run({
      map,
      points,
      config: {
        img: Wailing
      }
    });
  }, [locations]);

  const onChange = (mo, str) => {
    setTime(mo);
  };

  const createWay = () => {
    const data = {};
    if (time) {
      data.startTime = time[0].format('YYYY-MM-DD HH:mm:ss');
      data.endTime = time[1].format('YYYY-MM-DD HH:mm:ss');
    }
    store.getlocation({
      personid,
      ...data
    });
  };

  return (
    <div className={style['ui-wrap']}>
      <div className={style['tol-wrap']}>
        <RangePicker onChange={onChange} />
        <Button style={{ marginLeft: '10px' }} onClick={createWay}>轨迹生成</Button>
      </div>
      <div className={style.address} id="address">
      </div>
    </div>
  );
});

import React from 'react';
// import { Button } from 'antd';
import SvgIcon from '@/components/Icon/Svg';
import styles from './index.module.less';

export default function useScreenshot({ store, controlFied }) {
  const state = store[controlFied || 'fullScreenState'];
  // 跨浏览器返回正处于全屏的元素

  const fullscreenElement = () => {
    const fullscreenEle = document.fullscreenElement
      || document.mozFullScreenElement
      || document.webkitFullscreenElement;
    // 注意：要在用户授权全屏后才能获取全屏的元素，否则 fullscreenEle为null
    return fullscreenEle;
  };

  // 跨浏览器返回当前 document 是否进入了可以请求全屏模式的状态

  const fullscreenEnable = () => {
    const isFullscreen = document.fullscreenEnabled
      || window.fullScreen
      || document.webkitIsFullScreen
      || document.msFullscreenEnabled;
    // 注意：要在用户授权全屏后才能准确获取当前的状态
    // if (isFullscreen) {
    //   console.log('全屏模式');
    // } else {
    //   console.log('非全屏模式');
    // }
    return isFullscreen;
  };

  // 跨浏览器发动全屏;

  const lanchFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    }
  };

  // 跨浏览器退出全屏;

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExiFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  };
  const showFullScreen = ({ elID }) => {
    const node = document.getElementById(elID);
    // debugger;
    if (!state) {
      const obj = {};
      obj[controlFied || 'fullScreenState'] = true;
      store.update(obj);
      lanchFullscreen(node);
    } else {
      const obj = {};
      obj[controlFied || 'fullScreenState'] = false;
      store.update(obj);
      exitFullscreen();
    }
  };

  const createDom = ({ elID = 'player1', minIcon = '', largeIcon = '全屏' }) =>
    (<>
      <span className={styles['video-btn']} onClick={() => showFullScreen({ elID })}>
        {!state ? <SvgIcon name={largeIcon} /> : <SvgIcon name={minIcon} />}
      </span>
    </>);

  return {
    showFullScreen,
    createDom,
    exitFullscreen,
    lanchFullscreen,
    fullscreenEnable,
    fullscreenElement
  };
}

import React from 'react';
// import { Button } from 'antd';
import SvgIcon from '@/components/Icon/Svg';
import styles from './index.module.less';

export default function useScreenshot() {
  const createPic = ({ fileName = (new Date()).toString(), elID = 'video' }) => {
    let fileType = 'png'; // 如果文件名中没有带后缀，默认使用png
    switch (fileName) { // 判断保存的图片格式
      case fileName.indexOf('png') > -1:
        fileType = 'png';
        break;
      case fileName.indexOf('jpg') > -1:
        fileType = 'jpg';
        break;

      case fileName.indexOf('jpeg') > -1:
        fileType = 'jpeg';
        break;
      case fileName.indexOf('bmp') > -1:
        fileType = 'bmp';
        break;
      case fileName.indexOf('gif') > -1:
        fileType = 'gif';
        break;
      default:
        fileType = 'png';
        break;
    }
    const video = document.querySelector(`#${elID}`); // 找到需要截图的video标签
    // eslint-disable-next-line no-multi-assign
    const canvas = window.canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 100;
    canvas.height = video.videoHeight || 100;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // 图片大小和视频分辨率一致
    const strDataURL = canvas.toDataURL(`image/${fileType}`); // canvas中video中取一帧图片并转成dataURL
    const arr = strDataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], {
      type: mime
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 1000);
  };

  // eslint-disable-next-line no-unused-vars
  const createBtn = ({ fileName, elID, icon }) =>
    (<span className={styles['video-btn']} onClick={() => createPic({ fileName, elID })}>
      <SvgIcon name={icon} />
    </span>);

  return {
    createPic,
    createBtn
  };
}

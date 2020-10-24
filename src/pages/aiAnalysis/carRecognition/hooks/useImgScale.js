import React, { useCallback, useState } from 'react';
import { Modal, Button } from 'antd';
import styles from './useImgScale.module.less';

export default function useActionModal({
  title = '',
  store
}) {
  const { imgUrl, carVisible } = store;

  // 控制图片的缩放 sx: x轴的缩放比例，sy： y轴的缩放比例，tx:x轴的偏移量，ty： y轴的偏移量
  const [ctlImgFig, setCtlImgFig] = useState({
    sx: 1, sy: 1, tx: 0, ty: 0
  });
  const {
    sx, sy, tx, ty
  } = ctlImgFig;

  // 放大图片
  const showBig = () => {
    if (sx >= 1) {
      const {
        sx: sxtemp, sy: sytemp
      } = ctlImgFig;
      setCtlImgFig({
        ...ctlImgFig,
        ...{ sx: sxtemp + 1, sy: sytemp + 1 }
      });
      // console.log(sxtemp + 1, sytemp + 1);
      document.getElementById('imgRed').style.transform = `scale(${sxtemp + 1}, ${sytemp + 1})`;
    }
  };
    // 缩小图片
  const showSmal = () => {
    if (sx > 1) {
      const {
        sx: sxtemp, sy: sytemp
      } = ctlImgFig;
      setCtlImgFig({
        ...ctlImgFig,
        ...{ sx: sxtemp - 1, sy: sytemp - 1 }
      });
      // console.log(sxtemp - 1, sytemp - 1);
      document.getElementById('imgRed').style.transform = `scale(${sxtemp - 1}, ${sytemp - 1})`;
    }
  };
  const handleScroll = (e) => {
    if (e.nativeEvent.deltaY <= 0) {
      showSmal();
    } else {
      showBig();
    }
  };
    // 移动图片
  const moveImg = (e) => {
    const {
      tx: txtemp, ty: tytemp
    } = ctlImgFig;
    const event = e || window.event;
    const nowX = event.clientX - txtemp;
    const nowY = event.clientY - tytemp;
    document.onmousemove = (ev) => {
      setCtlImgFig({
        ...ctlImgFig,
        ...{
          tx: ev.clientX - nowX,
          ty: ev.clientY - nowY
        }
      });
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmousedown = null;
    };
  };
  // 响应弹窗取消事件
  const onCancel = useCallback(() => {
    store.reset(['carVisible']);
    // 清楚图片的推拽放大信息
    setCtlImgFig({
      sx: 1, sy: 1, tx: 0, ty: 0
    });
  }, [store]);

  // 创建默认弹窗
  const createModal = ({
    modalProps = {}
  } = {}) => (
    <Modal
      visible={carVisible}
      title={title}
      onCancel={onCancel}
      footer={null}
      className={styles['modal-box']}
      width={860}
      {...modalProps}
    >
      <div className={styles['adjust-img-wrap']} onWheel={(e) => handleScroll(e)}>
        <div
          onMouseDown={() => moveImg()}
          className={styles['modal-left-img']}
          id="imgRed"
          style={{
            transform: `scale(${sx}, ${sy})`, left: `${tx}px`, top: `${ty}px`, backgroundImage: `url(${imgUrl})`
          }}
        />
        <div className={styles['img-control-wrap']}>
          <Button className={styles['img-control-btn']} onClick={showBig}>+</Button>
          <Button className={styles['img-control-btn']} onClick={showSmal}>-</Button>
        </div>
      </div>
    </Modal>
  );

  return {
    createModal, onCancel
  };
}

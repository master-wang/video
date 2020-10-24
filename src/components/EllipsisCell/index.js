import React from 'react';
import { Tooltip } from 'antd';

export default ({
  text,
  lineClamp = 1,
  tipShow = true,
  tipPlacement = 'right'
}) => {
  const ellipsis = <div className={`f-toe${lineClamp}`}>{text}</div>;
  if (tipShow) {
    return (
      <Tooltip
        placement={tipPlacement}
        title={text}
        overlayClassName="ellipsis-tip"
        getPopupContainer={trigger => trigger.parentNode}
      >
        {ellipsis}
      </Tooltip>
    );
  }
  return ellipsis;
};

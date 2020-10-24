import React, { useState } from 'react';
import VideoChannel from './videoChannel';
import Platform from './platform';

function rltmVideo() {
  // 做伸缩控制
  const [collapseState, setCollapseState] = useState(false);

  return (
    <>
      <VideoChannel collapseState={collapseState} />
      <Platform collapseState={collapseState} setCollapseState={setCollapseState} />
    </>
  );
}

export default rltmVideo;

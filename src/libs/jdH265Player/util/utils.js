export function ByteLengthOf(s) {
  // assuming the String is UCS-2(aka UTF-16) encoded
  let n = 0;
  for (let i = 0, l = s.length; i < l; i++) {
    const hi = s.charCodeAt(i);
    if (hi < 0x0080) { // [0x0000, 0x007F]
      n += 1;
    } else if (hi < 0x0800) { // [0x0080, 0x07FF]
      n += 2;
    } else if (hi < 0xD800) { // [0x0800, 0xD7FF]
      n += 3;
    } else if (hi < 0xDC00) { // [0xD800, 0xDBFF]
      const lo = s.charCodeAt(++i);
      if (i < l && lo >= 0xDC00 && lo <= 0xDFFF) { // followed by [0xDC00, 0xDFFF]
        n += 4;
      } else {
        throw new Error('UCS-2 String malformed');
      }
    } else if (hi < 0xE000) { // [0xDC00, 0xDFFF]
      throw new Error('UCS-2 String malformed');
    } else { // [0xE000, 0xFFFF]
      n += 3;
    }
  }
  return n;
}

export function MergeArrayBuffer(segments) {
  let sumLength = 0;
  for (let i = 0; i < segments.length; ++i) {
    sumLength += segments[i].byteLength;
  }
  const whole = new Uint8Array(sumLength);
  let pos = 0;
  for (let d = 0; d < segments.length; ++d) {
    whole.set(new Uint8Array(segments[d]), pos);
    pos += segments[d].byteLength;
  }
  return whole.buffer;
}

export function parseChannelInfo(data, streamNum) {
  return {
    DeviceType: data.accessWay,
    UserName: data.user,
    PassWord: data.password,
    DeviceIP: data.deviceIp,
    DevicePort: data.devicePort,
    ChannelNum: data.channelNum,
    StreamNum: streamNum,
    StreamServerIP: data.streamServerIp,
    StreamServerPort: data.streamServerPort
  };
}

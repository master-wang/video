export function extractNALu(buffer) {
  let i = 0;
  const length = buffer.byteLength;
  let value;
  let state = 0;
  const result = [];
  let lastIndex;
  // debug.log('length='+length);
  while (i < length) {
    value = buffer[i++];
    // finding 3 or 4-byte start codes (00 00 01 OR 00 00 00 01)
    // debug.log('state='+state);
    switch (state) {
      case 0:
        if (value === 0) {
          state = 1;
        }
        break;
      case 1:
        if (value === 0) {
          state = 2;
        } else {
          state = 0;
        }
        break;
      case 2:
      case 3:
        if (value === 0) {
          state = 3;
        } else if (value === 1 && i < length) {
          if (lastIndex) {
            result.push(buffer.subarray(lastIndex, i - state - 1));
          }
          lastIndex = i;
          state = 0;
        } else {
          state = 0;
        }
        break;
      default:
        break;
    }
  }
  if (lastIndex) {
    result.push(buffer.subarray(lastIndex, length));
  }
  return result;
}

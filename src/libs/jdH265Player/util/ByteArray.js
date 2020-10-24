export class ByteArray {
  constructor(ab) {
    this.buffer = ab;
    this.dataView = new DataView(ab);
    // 偏移量
    this.offset = 0;
  }

  GetArrayBuffer() {
    return this.buffer;
  }


  get bytesAvailable() {
    let diff = this.buffer.byteLength - this.offset;
    if (diff < 0) {
      diff = 0;
    }
    return diff;
  }


  WriteString(str) {
    for (let i = 0; i < str.length; i++) {
      this.dataView.setUint8(this.offset + i, str.charCodeAt(i));// 以大端字节序
    }

    this.offset += str.length;
  }

  WriteUint32(value) {
    this.dataView.setUint32(this.offset, value);// 以大端字节序
    this.offset += 4;
  }

  ReadUint32(little = false) {
    const result = this.dataView.getUint32(this.offset, little);
    this.offset += 4;
    return result;
  }

  ReadUint16(little = false) {
    const result = this.dataView.getUint16(this.offset, little);
    this.offset += 2;
    return result;
  }

  ReadUint8() {
    const result = this.dataView.getUint8(this.offset);
    this.offset += 1;
    return result;
  }

  SliceNewAB(len, num = 0) {
    const ab = this.buffer.slice((this.offset - num), (this.offset - num) + len);
    this.offset += len - num;
    return ab;
  }

  SetOffset(num) {
    this.offset += num;
  }

  ReadStringBytes(len) {
    let str = '';
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(this.dataView.getUint8(this.offset + i));
    }
    this.offset += len;
    return str;
  }

  // ReadString() { // 有空写
  // var length=this.readInt16();
  // var uint8Array=new Uint8Array(this.buffer,this.offset, length);
  // var ret=this.parseUTF8(uint8Array, 0, uint8Array.length);
  // this.offset+=uint8Array.length;
  // return ret;
  // }
}

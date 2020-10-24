import parser from 'xml-js';
import { ByteArray } from './util/ByteArray';
import { extractNALu } from './util/extractNALu';
import { ByteLengthOf, MergeArrayBuffer, parseChannelInfo } from './util/utils';
/* eslint-disable */

export default class JdH265PLayer {
  constructor() {
    this.xmlVideoBody = '';
    this.player = null;
    this.ws = null;
    this.video = null;
    this.remainAB = null;
    this.haveHalf = null;
    this.nalus = null;
    this.noRemain = false;
    this.prepareArr = null;
    this.nalOk = false;
    this.spsnal = null;
    this.ppsnal = null;
    this.ipsnal = null;
    this.onal = null;
    this.xmlHeartBody = '<Response><CmdType>Keepalive</CmdType></Response>';
    this.xmlHeader = '<?xml version="1.0"?>';
    this.xmlVideoBody = '';
  }

  monitorChannel = async ({ url, channelId, streamNum = 0 }) => {
    // const formData = new FormData();
    // formData.append('channelId', channelId);
    const res = await req.ajax(`${url}/${channelId}`, {
      method: 'get'
    });
    console.log(res);
    // 模拟json返回
    // let res = mock[channelId];
    // if (!res) {
    //   res = channel1;
    // }
    const data = parseChannelInfo(res, streamNum);
    this.openVideo(data);
  }

  openVideo = (data) => {
    const wsUrl = data.StreamServerIP;
    const wsPort = data.StreamServerPort;
    const json = {
      Notify: {
        CmdType: 'Play',
        ...data
      }
    };
    // this.xmlVideoBody = parser.json2xml(JSON.stringify(json), { compact: true });
    this.ws = new WebSocket(`ws://${wsUrl}:${wsPort}`);
    this.ws.binaryType = 'arraybuffer';
    this.xmlVideoBody = parser.json2xml(JSON.stringify(json), { compact: true });
    // this.xmlVideoBody = '<?xml version="1.0"?><Notify><CmdType>Play</CmdType><DeviceType>1101</DeviceType><UserName>admin</UserName><PassWord>jdd123456</PassWord><DeviceIP>10.13.145.251</DeviceIP><DevicePort>554</DevicePort><ChannelNum>0</ChannelNum><StreamNum>1</StreamNum><StreamServerIP>10.13.144.201</StreamServerIP><StreamServerPort>10088</StreamServerPort></Notify>';
    this.ws.addEventListener('open', this.WebSocketOpen);
    this.ws.addEventListener('message', this.WebSocketMessage);
    this.ws.addEventListener('close', this.WebSocketClose);
  }

  feed = (data) => {
    let rawArray = [];
    let nalus;
    nalus = extractNALu(new Uint8Array(data));
    const nal = nalus.shift();
    const nalType = (nal[0] & 0x7E)>>1;
    if(!this.nalOk){
      if (nalType === 32) {
        this.spsnal = data;
        return;
      }
      if (nalType === 33) {
        this.ppsnal = data;
        return;
      }
      if (nalType === 34) {
        this.ipsnal = data;
        return;
      }
      if((nalType >15) && (nalType< 22)){
        this.onal = data;
        return;
      }
      if(this.spsnal !== null && this.ppsnal !==null && this.ipsnal !==null && this.onal !== null){
        rawArray.push(this.spsnal, this.ppsnal, this.ipsnal, this.onal, data);
        this.nalOk = true; // 找到首桢了
        this.prepareArr = MergeArrayBuffer(rawArray);
        this.player._handle_raw(this.prepareArr, () => {
          this.noRemain = true
        });
        this.prepareArr = null
        this.noRemain = false;
      }
    } else {
       if(!this.prepareArr){
        this.prepareArr = data;
        return;
      }
      rawArray.push(this.prepareArr, data)
      this.prepareArr = MergeArrayBuffer(rawArray);
       if(this.noRemain){
        this.player._handle_raw(this.prepareArr, () => {
          this.noRemain = true
        })
        this.prepareArr = null
        this.noRemain = false;
      }
    }
  }

  ParseSocketData = (abdata) => {
    const socketBA = new ByteArray(abdata);
    while (socketBA.bytesAvailable > 0) {
      const verbonc = socketBA.ReadUint32();// verbonc
      const companyName = socketBA.ReadUint32();// company
      const imsgType = socketBA.ReadUint32();// //消息类型
      const linType = socketBA.ReadUint32();// 指令类型
      const iCmdLen = socketBA.ReadUint32();// 指令长度
      socketBA.ReadUint32();// 数据全长
      socketBA.ReadUint32();// 保留字段
      if (socketBA.bytesAvailable < iCmdLen) {
        this.haveHalf = true;
        this.remainAB = socketBA.SliceNewAB((socketBA.bytesAvailable + 28), 28);
        return;
      }
      if (imsgType === 1603) { // 后面为视频数据
        const biSize = socketBA.ReadUint32();
        const biWidth = socketBA.ReadUint32();
        const biHeight = socketBA.ReadUint32();
        const biPlanes = socketBA.ReadUint16();
        const biBitCount = socketBA.ReadUint16();
        const biCompression = socketBA.ReadUint32();
        const biSizeImage = socketBA.ReadUint32();
        const biXPelsPerMeter = socketBA.ReadUint32();
        const biYPelsPerMeter = socketBA.ReadUint32();
        const biClrUsed = socketBA.ReadUint32();
        const biClrImportant = socketBA.ReadUint32();
        // 开始处理h265数据
        const h265buf = socketBA.SliceNewAB(biSizeImage);
        this.feed(h265buf);
      } else { // 跳过其他类型
        socketBA.SetOffset(iCmdLen);
      }
    }
  }

  WebSocketMessage= (evt) => {
    if (!this.player) {
      return;
    }
    if (this.haveHalf === true) { // 含有上次留的数据,旧数据后面加上把新数据
      const arr = [];
      arr.push(this.remainAB, evt.data);
      const mergeab = MergeArrayBuffer(arr);
      this.remainAB = null;
      this.haveHalf = false;
      this.ParseSocketData(mergeab);
    } else {
      this.ParseSocketData(evt.data);
    }
  }

  StartHeartBeat= () => {
    this.interval = setInterval(() => {
      const strxml = this.xmlHeader + this.xmlHeartBody;
      const mun = ByteLengthOf(strxml);
      const ab = new ArrayBuffer((mun + 28));
      const sendBA = new ByteArray(ab);
      // 写入28个字节头
      sendBA.WriteUint32(0x0100);// 版本号(ver):
      sendBA.WriteString('BST ');// 公司必须是4个字节所以加个空格，服务器限制公司名bst
      sendBA.WriteUint32(1502);// 消息类型(msgtype):保活指令:
      sendBA.WriteUint32(0);// 指令类型
      sendBA.WriteUint32(mun);// //指令长度 // 0x0000004a
      sendBA.WriteUint32(mun + 28);// 数据全长 0x00000066
      sendBA.WriteUint32(0);// 保留字段
      sendBA.WriteString(strxml);
      this.ws.send(sendBA.GetArrayBuffer());
    }, 5000);
  }

  WebSocketOpen = () => {
    console.log('websocket连接成功==');
    const strxml =  this.xmlHeader + this.xmlVideoBody;
    console.log(strxml);
    const mun = ByteLengthOf(strxml);
    // 写入28个字节头
    const ab = new ArrayBuffer((mun + 28));
    const sendBA = new ByteArray(ab);
    sendBA.WriteUint32(0x0100);// 版本号(ver):
    sendBA.WriteString('BST ');// 公司必须是4个字节所以加个空格，服务器限制公司名bst
    sendBA.WriteUint32(1603);// 消息类型(msgtype):播放指令: 0x00000640
    sendBA.WriteUint32(0);// 指令类型
    sendBA.WriteUint32(mun);// //指令长度
    sendBA.WriteUint32((mun + 28));// 数据全长
    sendBA.WriteUint32(0);// 保留字段
    // 写入xml字符串
    sendBA.WriteString(strxml);
    this.ws.send(sendBA.GetArrayBuffer());
    this.StartHeartBeat();
    this.video = document.getElementById('canvas');
    // const fpsWrap = document.querySelector('.hevc-fps');
    // const status = document.querySelector('.hevc-status');
    const playback = () => {
      // event.preventDefault()
      // if (player) {
      //   player.stop()
      // }
      this.player = new libde265.RawPlayer(this.video);
      this.player._init_raw();
      this.player.set_status_callback((msg, fps) => {
        console.log(fps);
        // player.disable_filters(true)
        // switch (msg) {
        //   case 'loading':
        //     status.innerHTML = 'Loading movie...';
        //     break;
        //   case 'initializing':
        //     status.innerHTML = 'Initializing...';
        //     break;
        //   case 'playing':
        //     status.innerHTML = 'Playing...';
        //     // document.querySelector('.js-log-hevc').style.display = 'none'
        //     // playH264()
        //     break;
        //   case 'stopped':
        //     status.innerHTML = 'stopped';
        //     break;
        //   case 'fps':
        //     fpsWrap.innerHTML = `${Number(fps).toFixed(2)} fps`;
        //     break;
        //   default:
        //     status.innerHTML = msg;
        // }
      });
    };
    playback();
  }

  WebSocketClose = () => {
    if (this.player) {
      this.player.stop()
    }
    this.player = null;
    this.noRemain = false;
    this.prepareArr = null;
    this.remainAB = null;
    this.haveHalf = false;
    this.nalOk = false;
    this.spsnal = null;
    this.ppsnal = null;
    this.ipsnal = null;
    this.onal = null;
    clearInterval(this.interval);
    this.interval = null;
    this.ws = null;
    this.video = null;
    this.onclose = true;
    this.openVideo();
  }
}

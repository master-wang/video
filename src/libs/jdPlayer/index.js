import parser from 'xml-js';
import * as debug from './util/debug';
import { NALU } from './util/nalu';
import { H264Parser } from './parsers/h264';
import { AACParser } from './parsers/aac';
import Event from './util/event';
import RemuxController from './controller/remux';
import BufferController from './controller/buffer';
import { MergeArrayBuffer, ByteLengthOf, parseChannelInfo } from './util/utils';
import { ByteArray } from './util/ByteArray';
import {
  version, company, msgTypeVideo, directType, remainField, msgTypeHeart
} from './config';
/* eslint-disable */
import mock, { channel1 } from './mock';

window.MediaSource = window.MediaSource || window.WebKitMediaSource;

export default class JdPLayer extends Event {
  static isSupported(codec) {
    return (window.MediaSource && window.MediaSource.isTypeSupported(codec));
  }

  constructor(options) {
    super('jdPlayer');
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;

    const defaults = {
      httpurl: '',
      node: '',
      mode: 'video', // both, audio, video
      flushingTime: 1000,
      clearBuffer: true,
      onReady: null, // function called when MSE is ready to accept frames
      fps: 25,
      debug: false
    };

    this.options = { ...defaults, ...options };

    if (this.options.debug) {
      debug.setLogger();
    }

    if (typeof this.options.node === 'string' && this.options.node === '') {
      debug.error('no video element were found to render, provide a valid video element');
    }

    // if (typeof this.options.httpurl === 'string' && this.options.httpurl == '') {
    //   debug.error('no httpurl');
    // }

    if (!this.options.fps) {
      this.options.fps = 25;
    }
    /* eslint-disable no-bitwise */
    this.frameDuration = (1000 / this.options.fps) | 0;

    this.node = typeof this.options.node === 'string' ? document.getElementById(this.options.node) : this.options.node;
    this.httpurl = this.options.httpurl;
    this.sourceBuffers = {};
    this.isMSESupported = !!window.MediaSource;

    if (!this.isMSESupported) {
      throw 'Oops! Browser does not support media source extension.';
    }

    this.setupMSE();
    this.remuxController = new RemuxController(this.options.clearBuffer);
    this.remuxController.addTrack(this.options.mode);

    this.mseReady = false;
    this.lastCleaningTime = Date.now();
    this.keyframeCache = [];
    this.frameCounter = 0;
    this.remuxController.on('buffer', this.onBuffer.bind(this));
    this.remuxController.on('ready', this.createBuffer.bind(this));

    this.spsnal = null;
    this.ppsnal = null;
    this.ipsnal = null;
    this.spspps = false;
    this.haveHalf = false;
    this.ws = null;
    this.remainAB = null;// 剩余arraybuffer;
    this.minSeek = null;

    this.xmlHeartBody = '<Response><CmdType>Keepalive</CmdType></Response>';
    this.xmlHeader = '<?xml version="1.0"?>';
    this.xmlVideoBody = '';
  }



  monitorChannel = async ({ url, channelId, streamNum = 0 }) => { // stream为主码流0还是子码流1
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
    this.ws = new WebSocket(`ws://${wsUrl}:${wsPort}`);
    this.ws.binaryType = 'arraybuffer';
    const json = {
      Notify: {
        CmdType: 'Play',
        ...data
      }
    };
    this.xmlVideoBody = parser.json2xml(JSON.stringify(json), { compact: true });
    this.ws.addEventListener('open', this.WebSocketOpen);
    this.ws.addEventListener('message', this.WebSocketMessage);
    this.ws.addEventListener('error', this.WebSocketError);
  }

  StartHeartBeat() {
    this.interval = setInterval(() => {
      const strxml = this.xmlHeader + this.xmlHeartBody;
      const mun = ByteLengthOf(strxml);
      const ab = new ArrayBuffer((mun + 28));
      const sendBA = new ByteArray(ab);
      // 写入28个字节头
      sendBA.WriteUint32(version);// 版本号(ver):
      sendBA.WriteString(company);// 公司必须是4个字节所以加个空格，服务器限制公司名bst
      sendBA.WriteUint32(msgTypeHeart);// 消息类型(msgtype):保活指令:
      sendBA.WriteUint32(directType);// 指令类型
      sendBA.WriteUint32(mun);// //指令长度 // 0x0000004a
      sendBA.WriteUint32(mun + 28);// 数据全长 0x00000066
      sendBA.WriteUint32(remainField);// 保留字段
      sendBA.WriteString(strxml);
      this.ws.send(sendBA.GetArrayBuffer());
    }, 5000);
    this.minSeek = setInterval(() => {
      if (this.node.buffered.length === 0) return;

      if ((this.node.buffered.end(0) - this.node.currentTime) > 2.2) { // 缓存超过2秒跳帧播放
        this.node.currentTime = this.node.buffered.end(0);
      }
    }, 1000);
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.minSeek) {
      clearInterval(this.minSeek);
    }
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (this.bufferControllers) {
        this.releaseBuffer();
        this.clearBuffer();
      }
    }, this.options.flushingTime);
  }

  WebSocketError = (error) => {
    console.log(error);
  }

  WebSocketOpen = () => {
    debug.log('websocket连接成功==');
    const strxml = this.xmlHeader + this.xmlVideoBody;
    const mun = ByteLengthOf(strxml);
    // 写入28个字节头
    const ab = new ArrayBuffer((mun + 28));
    const sendBA = new ByteArray(ab);
    sendBA.WriteUint32(version);// 版本号(ver):
    sendBA.WriteString(company);// 公司必须是4个字节所以加个空格，服务器限制公司名bst
    sendBA.WriteUint32(msgTypeVideo);// 消息类型(msgtype):播放指令: 0x00000640
    sendBA.WriteUint32(directType);// 指令类型
    sendBA.WriteUint32(mun);// //指令长度
    sendBA.WriteUint32((mun + 28));// 数据全长
    sendBA.WriteUint32(remainField);// 保留字段
    // 写入xml字符串
    sendBA.WriteString(strxml);
    this.ws.send(sendBA.GetArrayBuffer());
    this.node.play();
    this.StartHeartBeat();
  }

  WebSocketMessage = (evt) => {
    if (this.haveHalf === true) { // 含有上次留的数据,旧数据后面加上把新数据
      const arr = [];
      arr.push(this.remainAB);
      arr.push(evt.data);
      const mergeab = MergeArrayBuffer(arr);
      this.remainAB = null;
      this.haveHalf = false;
      this.ParseSocketData(mergeab);
    } else {
      this.ParseSocketData(evt.data);
    }
  }

  /* eslint-disable no-unused-vars */
  ParseSocketData(abdata) {
    const socketBA = new ByteArray(abdata);
    while (socketBA.bytesAvailable > 0) {
      const verbonc = socketBA.ReadUint32();// verbonc
      const companyName = socketBA.ReadUint32();// company
      const imsgType = socketBA.ReadUint32();// //消息类型
      const linType = socketBA.ReadUint32();// 指令类型
      const iCmdLen = socketBA.ReadUint32();// 指令长度
      const hType = socketBA.ReadUint32();// 保留字段
      socketBA.ReadUint32() // 保留字段
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

        // 开始处理h264数据
        const h264buf = socketBA.SliceNewAB(biSizeImage);
        this.feed({
          video: new Uint8Array(h264buf)
        });
        // // debug.log('this.nalsboncarr.length='+this.nalsboncarr.length);
        this.releaseBuffer();
        this.clearBuffer();
      } else { // 跳过其他类型
        socketBA.SetOffset(iCmdLen);
      }
    }
  }

  setupMSE() {
    this.mediaSource = new MediaSource();
    this.node.src = URL.createObjectURL(this.mediaSource);
    this.mediaSource.addEventListener('sourceopen', this.onMSEOpen.bind(this));
    this.mediaSource.addEventListener('sourceclose', this.onMSEClose.bind(this));
    this.mediaSource.addEventListener('webkitsourceopen', this.onMSEOpen.bind(this));
    this.mediaSource.addEventListener('webkitsourceclose', this.onMSEClose.bind(this));
  }

  feed(data) {
    let remux = false;
    let nalus;
    let aacFrames;
    const chunks = {
      video: [],
      audio: []
    };

    if (!data || !this.remuxController) return;
    const duration = data.duration ? parseInt(data.duration, 10) : 0;
    if (data.video) {
      nalus = H264Parser.extractNALu(data.video);
      const nalarr = [];
      const nal = nalus.shift();
      const nalType = nal[0] & 0x1f;

      if (this.spspps === false) {
        if (nalType === 7) {
          this.spsnal = nal;
          debug.log('找到sps');
          return;
        }
        if (nalType === 8) {
          this.ppsnal = nal;
          debug.log('找到pps=');
          return;
        }
        if (nalType === 5) {
          this.ipsnal = nal;
          debug.log('找到pps=');
          return;
        }
        if (this.spsnal != null && this.ppsnal != null) {
          nalarr.push(this.spsnal);
          nalarr.push(this.ppsnal);
          nalarr.push(this.ipsnal);
          nalarr.push(nal);
          this.spspps = true;
          debug.log('用7,8,5帧来准备封装initSegment');
        }
      } else if (nalType !== 7 && nalType !== 8) {
        nalarr.push(nal);
      }
      if (nalarr.length > 0) {
        chunks.video = this.getVideoFrames(nalarr, duration); // nalarr nalus
        remux = true;
      }
    }
    if (data.audio) {
      aacFrames = AACParser.extractAAC(data.audio);
      if (aacFrames.length > 0) {
        chunks.audio = this.getAudioFrames(aacFrames, duration);
        remux = true;
      }
    }
    if (!remux) {
      debug.error('Input object must have video and/or audio property. Make sure it is not empty and valid typed array');
      return;
    }
    this.remuxController.remux(chunks);
  }

  getVideoFrames(nalus, duration) {
    let nalu;
    let units = [];
    const samples = [];
    let naluObj;
    let sampleDuration;
    let adjustDuration = 0;
    let numberOfFrames = [];
    /* eslint-disable no-restricted-syntax */
    for (nalu of nalus) {
      naluObj = new NALU(nalu);
      // debug.log('帧类型='+naluObj.type());
      units.push(naluObj);
      if (naluObj.type() === NALU.IDR || naluObj.type() === NALU.NDR) {
        samples.push({ units });
        units = [];
        if (this.options.clearBuffer) {
          if (naluObj.type() === NALU.IDR) {
            numberOfFrames.push(this.frameCounter);
          }
          this.frameCounter++;
        }
      }
    }

    if (duration) {
      sampleDuration = duration / samples.length | 0;
      adjustDuration = (duration - (sampleDuration * samples.length));
    } else {
      sampleDuration = this.frameDuration;
    }
    samples.forEach((sample) => {
      sample.duration = adjustDuration > 0 ? (sampleDuration + 1) : sampleDuration;
      if (adjustDuration !== 0) {
        adjustDuration--;
      }
    });

    /* cache keyframe times if clearBuffer set true */
    if (this.options.clearBuffer) {
      numberOfFrames = numberOfFrames.map((total) => (total * sampleDuration) / 1000);
      this.keyframeCache = this.keyframeCache.concat(numberOfFrames);
    }
    return samples;
  }

  getAudioFrames(aacFrames, duration) {
    const samples = [];
    let units;
    let sampleDuration;
    let adjustDuration = 0;

    for (units of aacFrames) {
      samples.push({ units });
    }

    if (duration) {
      sampleDuration = duration / samples.length | 0;
      adjustDuration = (duration - (sampleDuration * samples.length));
    } else {
      sampleDuration = this.frameDuration;
    }
    samples.forEach((sample) => {
      sample.duration = adjustDuration > 0 ? (sampleDuration + 1) : sampleDuration;
      if (adjustDuration !== 0) {
        adjustDuration--;
      }
    });
    return samples;
  }

  destroy() {
    this.stopInterval();
    if (this.mediaSource) {
      try {
        if (this.bufferControllers) {
          this.mediaSource.endOfStream();
        }
      } catch (e) {
        debug.error(`mediasource is not available to end ${e.message}`);
      }
      this.mediaSource = null;
    }
    if (this.remuxController) {
      this.remuxController.destroy();
      this.remuxController = null;
    }
    if (this.bufferControllers) {
      /* eslint-disable guard-for-in */
      for (const type in this.bufferControllers) {
        this.bufferControllers[type].destroy();
      }
      this.bufferControllers = null;
    }
    this.node = false;
    this.mseReady = false;
    this.videoStarted = false;
    if(this.ws){
      this.ws.close();
    }
  }

  createBuffer() {
    if (!this.mseReady || !this.remuxController
      || !this.remuxController.isReady() || this.bufferControllers) return;
    this.bufferControllers = {};
    for (const type in this.remuxController.tracks) {
      const track = this.remuxController.tracks[type];
      if (!JdPLayer.isSupported(`${type}/mp4; codecs="${track.mp4track.codec}"`)) {
        debug.error('Browser does not support codec');
        return false;
      }
      const sb = this.mediaSource.addSourceBuffer(`${type}/mp4; codecs="${track.mp4track.codec}"`);
      this.bufferControllers[type] = new BufferController(sb, type);
      this.sourceBuffers[type] = sb;
      this.bufferControllers[type].on('error', this.onBufferError.bind(this));
    }
  }

  releaseBuffer() {
    for (const type in this.bufferControllers) {
      this.bufferControllers[type].doAppend();
    }
  }

  getSafeBufferClearLimit(offset) {
    let maxLimit = (this.options.mode === 'audio' && offset) || 0;
    let adjacentOffset;

    for (let i = 0; i < this.keyframeCache.length; i++) {
      if (this.keyframeCache[i] >= offset) {
        break;
      }
      adjacentOffset = this.keyframeCache[i];
    }

    if (adjacentOffset) {
      this.keyframeCache = this.keyframeCache.filter(keyframePoint => {
        if (keyframePoint < adjacentOffset) {
          maxLimit = keyframePoint;
        }
        return keyframePoint >= adjacentOffset;
      });
    }

    return maxLimit;
  }

  clearBuffer() {
    if (this.options.clearBuffer && (Date.now() - this.lastCleaningTime) > 3000) {
      for (const type in this.bufferControllers) {
        const cleanMaxLimit = this.getSafeBufferClearLimit(this.node.currentTime);
        this.bufferControllers[type].initCleanup(cleanMaxLimit);
        // debug.log('1qaz==================================================================');
      }
      this.lastCleaningTime = Date.now();
    }
  }

  onBuffer(data) {
    if (this.bufferControllers && this.bufferControllers[data.type]) {
      this.bufferControllers[data.type].feed(data.payload);
    }
  }

  /* Events on MSE */
  onMSEOpen() {
    this.mseReady = true;
    if (typeof this.options.onReady === 'function') {
      this.options.onReady();
      this.options.onReady = null;
    }
    this.createBuffer();
  }

  onMSEClose() {
    this.mseReady = false;
    this.videoStarted = false;
  }

  onBufferError(data) {
    if (data.name === 'QuotaExceeded') {
      this.bufferControllers[data.type].initCleanup(this.node.currentTime);
      return;
    }

    if (this.mediaSource.sourceBuffers.length > 0 && this.sourceBuffers[data.type]) {
      this.mediaSource.removeSourceBuffer(this.sourceBuffers[data.type]);
    }
    if (this.mediaSource.sourceBuffers.length === 0) {
      try {
        this.mediaSource.endOfStream();
      } catch (e) {
        debug.error('mediasource is not available to end');
      }
    }
  }
}

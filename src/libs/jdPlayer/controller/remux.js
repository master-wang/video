import * as debug from '../util/debug';
import { MP4 } from '../util/mp4-generator';
import { AACRemuxer } from '../remuxer/aac';
import { H264Remuxer } from '../remuxer/h264';
import { appendByteArray /* secToTime */ } from '../util/utils';
import Event from '../util/event';

export default class RemuxController extends Event {
  constructor(streaming) {
    super('remuxer');
    this.initialized = false;
    this.trackTypes = [];
    this.tracks = {};
    this.mediaDuration = streaming ? Infinity : 1000;
  }

  addTrack(type) {
    if (type === 'video' || type === 'both') {
      this.tracks.video = new H264Remuxer();
      this.trackTypes.push('video');
    }
    if (type === 'audio' || type === 'both') {
      this.tracks.audio = new AACRemuxer();
      this.trackTypes.push('audio');
    }
  }

  reset() {
    /* eslint-disable no-restricted-syntax */
    for (const type of this.trackTypes) {
      this.tracks[type].resetTrack();
    }
    this.initialized = false;
  }

  destroy() {
    this.tracks = {};
    this.offAll();
  }

  flush() {
    // debug.log('zjrflush');
    if (!this.initialized) {
      if (this.isReady()) {
        this.dispatch('ready');
        for (const type of this.trackTypes) {
          const track = this.tracks[type];
          const data = {
            type,
            payload: MP4.initSegment([track.mp4track], this.mediaDuration, track.mp4track.timescale)
          };
          this.dispatch('buffer', data);
        }
        debug.log('Initial segment 封装完成.');
        this.initialized = true;
      }
    } else { // 封装后面的帧
      for (const type of this.trackTypes) {
        const track = this.tracks[type];
        const pay = track.getPayload();
        if (pay && pay.byteLength) {
          const moof = MP4.moof(track.seq, track.dts, track.mp4track);
          const mdat = MP4.mdat(pay);
          const payload = appendByteArray(moof, mdat);
          const data = {
            type,
            payload,
            dts: track.dts
          };
          this.dispatch('buffer', data);
          // const duration = secToTime(track.dts / 1000);
          // debug.log(`put segment (${type}): ${track.seq} dts: ${track.dts} samples:
          // ${track.mp4track.samples.length} second: ${duration}`);
          debug.log('封装普通帧');
          track.flush();// base.js
        }
      }
    }
  }

  isReady() {
    for (const type of this.trackTypes) {
      if (!this.tracks[type].readyToDecode || !this.tracks[type].samples.length) return false;
    }
    return true;
  }

  remux(data) {
    for (const type of this.trackTypes) {
      const samples = data[type];
      /* eslint-disable no-continue */
      if (type === 'audio' && this.tracks.video && !this.tracks.video.readyToDecode) continue; /* if video is present, don't add audio until video get ready */
      if (samples.length > 0) {
        this.tracks[type].remux(samples);
      }
    }
    this.flush();
  }
}

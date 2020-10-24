import * as debug from '../util/debug';
import { H264Parser } from '../parsers/h264';
import { BaseRemuxer } from './base';

export class H264Remuxer extends BaseRemuxer {
  constructor() {
    super();
    this.readyToDecode = false;
    this.nextDts = 0;
    this.dts = 0;
    this.timescale = 1000;

    this.mp4track = {
      id: BaseRemuxer.getTrackID(),
      type: 'video',
      len: 0,
      fragmented: true,
      sps: '',
      pps: '',
      width: 0,
      height: 0,
      timescale: this.timescale,
      duration: this.timescale,
      samples: []
    };

    this.samples = [];
    this.h264 = new H264Parser(this);
  }

  resetTrack() {
    this.readyToDecode = false;
    this.mp4track.sps = '';
    this.mp4track.pps = '';
  }

  remux(samples) {
    // debug.log('zjrh264remuxsamples=');
    let sample;
    let units;
    let unit;
    let size;
    let keyFrame;
    /* eslint-disable no-restricted-syntax */
    for (sample of samples) {
      units = [];
      size = 0;
      keyFrame = false;
      for (unit of sample.units) {
        if (this.h264.parseNAL(unit)) {
          units.push(unit);
          size += unit.getSize();
          if (!keyFrame) {
            keyFrame = unit.isKeyframe();
          }
        }
      }

      if (units.length > 0 && this.readyToDecode) {
        this.mp4track.len += size;
        this.samples.push({
          units,
          size,
          keyFrame,
          duration: sample.duration
        });
      }
    }
  }

  getPayload() {
    if (!this.isReady()) {
      return null;
    }

    const payload = new Uint8Array(this.mp4track.len);
    let offset = 0;
    const { samples } = this.mp4track;
    let mp4Sample;
    let duration;

    this.dts = this.nextDts;

    while (this.samples.length) {
      const sample = this.samples.shift();
      const { units } = sample;

      duration = sample.duration;

      if (duration <= 0) {
        debug.log(`remuxer: invalid sample duration at DTS: ${this.nextDts} :${duration}`);
        this.mp4track.len -= sample.size;
        /* eslint-disable no-continue */
        continue;
      }

      this.nextDts += duration;
      mp4Sample = {
        size: sample.size,
        duration,
        cts: 0,
        flags: {
          isLeading: 0,
          isDependedOn: 0,
          hasRedundancy: 0,
          degradPrio: 0,
          isNonSync: sample.keyFrame ? 0 : 1,
          dependsOn: sample.keyFrame ? 2 : 1
        }
      };

      for (const unit of units) {
        payload.set(unit.getData(), offset);
        offset += unit.getSize();
      }

      samples.push(mp4Sample);
    }

    if (!samples.length) return null;

    return new Uint8Array(payload.buffer, 0, this.mp4track.len);
  }
}

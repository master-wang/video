import * as debug from '../util/debug';
import Event from '../util/event';
import { appendByteArray } from '../util/utils';

export default class BufferController extends Event {
  constructor(sourceBuffer, type) {
    super('buffer');

    this.type = type;
    this.queue = new Uint8Array();

    this.cleaning = false;
    this.pendingCleaning = 0;
    this.cleanOffset = 30;
    this.cleanRanges = [];

    this.sourceBuffer = sourceBuffer;
    this.sourceBuffer.addEventListener('updateend', () => {
      if (this.pendingCleaning > 0) {
        this.initCleanup(this.pendingCleaning);
        this.pendingCleaning = 0;
      }
      this.cleaning = false;
      if (this.cleanRanges.length) {
        this.doCleanup();
      }
    });

    this.sourceBuffer.addEventListener('error', () => {
      this.dispatch('error', { type: this.type, name: 'buffer', error: 'buffer error' });
    });
  }

  destroy() {
    this.queue = null;
    this.sourceBuffer = null;
    this.offAll();
  }

  doCleanup() {
    if (!this.cleanRanges.length) {
      this.cleaning = false;
      return;
    }
    const range = this.cleanRanges.shift();
    debug.log(`${this.type} 删除多余的 range [${range[0]} - ${range[1]})`);
    this.cleaning = true;
    this.sourceBuffer.remove(range[0], range[1]);
  }

  initCleanup(cleanMaxLimit) {
    if (this.sourceBuffer.updating) {
      this.pendingCleaning = cleanMaxLimit;
      return;
    }
    if (this.sourceBuffer.buffered && this.sourceBuffer.buffered.length && !this.cleaning) {
      for (let i = 0; i < this.sourceBuffer.buffered.length; ++i) {
        const start = this.sourceBuffer.buffered.start(i);
        let end = this.sourceBuffer.buffered.end(i);

        if ((cleanMaxLimit - start) > this.cleanOffset) {
          end = cleanMaxLimit - this.cleanOffset;
          if (start < end) {
            this.cleanRanges.push([start, end]);
          }
        }
      }
      this.doCleanup();
    }
  }

  doAppend() {
    if (!this.queue.length) return;

    if (this.sourceBuffer.updating) {
      return;
    }

    try {
      // debug.log('塞数据appendBuffer');
      this.sourceBuffer.appendBuffer(this.queue);
      this.queue = new Uint8Array();
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        debug.log(`${this.type} buffer quota full`);
        this.dispatch('error', { type: this.type, name: 'QuotaExceeded', error: 'buffer error' });
        return;
      }
      debug.error(`Error occured while appending ${this.type} buffer -  ${e.name}: ${e.message}`);
      this.dispatch('error', { type: this.type, name: 'unexpectedError', error: 'buffer error' });
    }
  }

  feed(data) {
    // debug.log('zjr经过事件发送得到数据来塞');
    this.queue = appendByteArray(this.queue, data);
  }
}

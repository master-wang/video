export default class Event {
  constructor(type) {
    this.listener = {};
    /* eslint-disable no-bitwise */
    this.type = type | '';
  }

  on(event, fn) {
    if (!this.listener[event]) {
      this.listener[event] = [];
    }
    this.listener[event].push(fn);
    return true;
  }

  off(event, fn) {
    if (this.listener[event]) {
      const index = this.listener[event].indexOf(fn);
      if (index > -1) {
        this.listener[event].splice(index, 1);
      }
      return true;
    }
    return false;
  }

  offAll() {
    this.listener = {};
  }

  dispatch(event, data) {
    if (this.listener[event]) {
      /* eslint-disable array-callback-return */
      this.listener[event].map((each) => {
        each.apply(null, [data]);
      });
      return true;
    }
    return false;
  }
}

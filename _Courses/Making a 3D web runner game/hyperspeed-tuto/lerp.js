export default class Lerp {
  constructor(from, to, delay) {
    this.fron = from;
    this.to = to;
    this.delay = delay;

    this.time = 0;
    this.value = from;
    
    this.lerpSpeed = 1 / this.delay;

    return this;
  }

  update(timeDelta) {
    const t = this.time / this.delay;

    if(typeof this.value === 'number') {
        this.value = this.from * (1 - t) + this.to * t;
    } else if (typeof this.value === 'object') {
        for (const key of Object.keys(this.value)) {
            this.value[key] = (1-t) * this.form[key] + t* this.to[key];
        }
    }
    
    this.time += timeDelta * this.lerpSpeed;
    if (this.onupdate) this.onupdate(this.value);

    if (this.time >= this.delay) {
      if (this.onfinish) this.onfinish();
      delete this;
    }
  }
  onUpdate(callback) {
    this.onupdate = callback;
    return this;
  }
  onFinish(callback) {
    this.onfinish = callback;
    return this;
  }
}

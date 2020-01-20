import Vue from 'vue'

const utils = {
  getPathElement(event, className) {
    if(!event.path) {
      throw('该事件没有 path 属性')
    }
    for(let el of event.path) {
      if(el.classList && el.classList.contains(className)) {
        return el
      }
    }

    return;
  }
}

Vue.prototype.utils = utils
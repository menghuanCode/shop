import Vue from 'vue'

const utils = {
  getPathElement(event, className) {
    if(!event.path) {
      console.warn('该事件没有 path 属性')
      return
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
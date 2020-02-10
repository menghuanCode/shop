let prefix = 'xiao'

const util = {
  localStorageGet(key) {
    return localStorage.getItem(prefix + key)
  },
  localStorageSet(key, value) {
    return localStorage.setItem(prefix + key, value)
  },
  sessionStorageGet(key) {
    return sessionStorage.getItem(prefix + key)
  },
  sessionStorageSet(key, value) {
    return sessionStorage.setItem(prefix + key, value)
  },
  queryPathSelector(event, className) {
    if (!event.path) {
      throw ('该事件没有 path 属性')
    }
    for (let el of event.path) {
      if (el.classList && el.classList.contains(className)) {
        return el
      }
    }

    return;
  }
}

module.exports = util
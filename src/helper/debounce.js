function debounce(fn, delay = 100) {
    let timer = null
    return function() {
        clearTimeout(timer)
        let args = arguments
        let that = this
        timer = setTimeout(function() {
            fn.apply(that, args)
        }, delay)
    }
}

export default debounce
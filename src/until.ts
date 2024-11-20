
/**
 * 防抖函数
 *
 * 延迟执行函数，只有在指定时间内未再次触发时才会执行。
 *
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 *
 * @example
 * const debouncedFn = debounce(() => console.log('Debounced!'), 1000)
 * window.addEventListener('resize', debouncedFn)
 */
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

/**
 * 节流函数
 *
 * 限制函数在指定时间间隔内只能执行一次。
 *
 * @param {Function} fn - 要执行的函数
 * @param {number} limit - 节流时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 *
 * @example
 * const throttledFn = throttle(() => console.log('Throttled!'), 1000)
 * window.addEventListener('scroll', throttledFn)
 */
export const throttle = <T extends (...args: any[]) => void>(
    fn: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let lastCall = 0
    return (...args: Parameters<T>) => {
        const now = Date.now()
        if (now - lastCall >= limit) {
            lastCall = now
            fn(...args)
        }
    }
}

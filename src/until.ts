/**
 * 防抖函数
 *
 * 创建一个防抖包装器，在指定时间内多次调用时，仅执行最后一次，
 * 可选 `immediate` 选项，使第一次调用立即执行。
 *
 * @template T - 目标函数的类型
 * @param {T} fn - 需要防抖处理的函数
 * @param {number} delay - 推迟执行的等待时间（毫秒）
 * @param {boolean} [immediate=false] - 是否在第一次调用时立即执行
 * @returns {((...args: Parameters<T>) => void) & { cancel: () => void }} 防抖后的函数，并附带 `cancel` 方法可手动取消防抖
 *
 * @example
 * const log = debounce(() => console.log("Executed"), 300);
 * window.addEventListener("resize", log); // 300ms 内重复触发时，仅最后一次执行
 *
 * @example
 * const logImmediate = debounce(() => console.log("Immediate Execution"), 300, true);
 * logImmediate(); // 立即执行一次，后续调用仍需等待 300ms
 *
 * @example
 * const debouncedFn = debounce(() => console.log("Will not execute"), 500);
 * debouncedFn();
 * debouncedFn.cancel(); // 取消执行
 */
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
    immediate: boolean = false
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let isFirstCall = true;

    const debounced = (...args: Parameters<T>) => {
        if (immediate && isFirstCall) {
            fn(...args);
            isFirstCall = false;
        } else {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
                isFirstCall = true; // 重置 `immediate` 标志，使下一次调用仍然符合 `immediate` 逻辑
            }, delay);
        }
    };

    // 取消防抖
    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        isFirstCall = true;
    };

    return debounced;
};


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

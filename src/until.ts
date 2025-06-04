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


/**
 * 深度比较两个值是否相等（结构 & 值完全一致）
 *
 * 支持基本类型、对象、数组、NaN、null、undefined，安全可靠。
 *
 * @param a - 比较的第一个值
 * @param b - 比较的第二个值
 * @returns 是否相等
 *
 * @example
 * isEqual({ a: 1 }, { a: 1 }) // true
 * isEqual([1, 2], [1, 2]) // true
 * isEqual(NaN, NaN) // true
 */
export function isEqual(a: any, b: any): boolean {
    if (a === b) return true;
  
    // NaN 特判
    if (typeof a === 'number' && typeof b === 'number') {
      if (isNaN(a) && isNaN(b)) return true;
    }
  
    // null / undefined
    if (a == null || b == null) return a === b;
  
    // 类型不同
    if (typeof a !== typeof b) return false;
  
    // Array
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    }
  
    // Date
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
  
    // RegExp
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString();
    }
  
    // Object（必须同为纯对象）
    if (Object.prototype.toString.call(a) === '[object Object]' &&
        Object.prototype.toString.call(b) === '[object Object]') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
  
      for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (!isEqual(a[key], b[key])) return false;
      }
      return true;
    }
  
    // 所有其他类型：不支持或无法判断相等
    return false;
  }

/**
 * 将 HTML 字符串中的 <img> 标签转换为自定义占位 <span> 标签。
 *
 * 此函数会查找 HTML 字符串中所有 <img src="..."> 标签，并将其替换为：
 * `<span class="custom-image" data-src="..."></span>` 形式。
 * 适用于懒加载、渲染优化或自定义图片组件的场景。
 *
 * ⚠️ 仅转换具有 `src` 属性的 `<img>` 标签，保留其他属性将被忽略。
 *
 * @param html - 原始 HTML 字符串
 * @returns 替换后的 HTML 字符串，非字符串或空字符串将原样返回
 *
 * @example
 * ```ts
 * replaceImgTagsWithSpans('<p><img src="a.jpg" /></p>');
 * // 返回 '<p><span class="custom-image" data-src="a.jpg"></span></p>'
 * ```
 */
export function replaceImgTagsWithSpans(html: string): string {
  if (typeof html !== 'string' || !html.trim()) return html;

  return html.replace(
    /<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*?>/gi,
    (_match, src) => {
      return `<span class="custom-image" data-src="${src}"></span>`;
    }
  );
}

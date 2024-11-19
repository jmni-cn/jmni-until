/**
 * 生成全局唯一标识符 (UID)
 *
 * 使用当前时间戳和随机字符串的组合，确保生成的字符串具有唯一性。
 *
 * @returns {string} 一个由时间戳和随机字符串组成的唯一标识符
 *
 * @example
 * const uid = generateUID();
 * console.log(uid); // 类似 "kxidq52e9xr73mpk"
 */
export const generateUID = (): string => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 10);
    return timestamp + randomPart;
};

/**
 * 获取 URL 查询参数值
 *
 * 解析当前页面的查询参数并返回指定参数的值。
 *
 * @param {string} key - 要获取的查询参数的名称
 * @returns {string | null} 查询参数的值，如果不存在则返回 null
 *
 * @example
 * // 假设当前 URL 是 'http://example.com?page=2&size=10'
 * const page = queryParams('page');
 * console.log(page); // 输出 "2"
 *
 * const size = queryParams('size');
 * console.log(size); // 输出 "10"
 *
 * const nonExistent = queryParams('nonExistent');
 * console.log(nonExistent); // 输出 null
 */
export const queryParams = (key: string): string | null => {
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);
    return searchParams.get(key);
};

/**
 * 获取两个数组的交集
 *
 * 返回两个数组中都存在的元素。
 *
 * @param {T[]} arr1 - 数组1
 * @param {T[]} arr2 - 数组2
 * @returns {T[]} 两数组的交集
 *
 * @example
 * const array1 = [1, 2, 3, 4];
 * const array2 = [3, 4, 5, 6];
 * const result = intersection(array1, array2);
 * console.log(result); // 输出 [3, 4]
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => arr2.includes(item));

/**
 * 获取数组的差集
 *
 * 返回 arr1 中存在但 arr2 中不存在的元素。
 *
 * @param {T[]} arr1 - 数组1
 * @param {T[]} arr2 - 数组2
 * @returns {T[]} 差集数组
 *
 * @example
 * const array1 = [1, 2, 3, 4];
 * const array2 = [3, 4, 5, 6];
 * const result = difference(array1, array2);
 * console.log(result); // 输出 [1, 2]
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => !arr2.includes(item));

/**
 * 将字符串首字母大写
 *
 * 返回首字母大写后的字符串。
 *
 * @param {string} str - 输入字符串
 * @returns {string} 首字母大写后的字符串
 *
 * @example
 * const result = capitalize('hello');
 * console.log(result); // 输出 "Hello"
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 将驼峰字符串转换为下划线格式
 *
 * @param {string} str - 输入字符串
 * @returns {string} 转换后的下划线字符串
 *
 * @example
 * const result = camelToSnake('camelCaseString');
 * console.log(result); // 输出 "camel_case_string"
 */
export const camelToSnake = (str: string): string =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * 将下划线字符串转换为驼峰格式
 *
 * @param {string} str - 输入字符串
 * @returns {string} 转换后的驼峰字符串
 *
 * @example
 * const result = snakeToCamel('snake_case_string');
 * console.log(result); // 输出 "snakeCaseString"
 */
export const snakeToCamel = (str: string): string =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * 格式化时间戳为指定格式
 *
 * @param {number} timestamp - 时间戳
 * @param {string} format - 格式化字符串，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 *
 * @example
 * const result = formatDate(1672531200000, 'YYYY-MM-DD');
 * console.log(result); // 输出 "2023-01-01"
 */
export const formatDate = (timestamp: number, format: string): string => {
    const date = new Date(timestamp);
    const map: Record<string, string | number> = {
        'YYYY': date.getFullYear(),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'DD': String(date.getDate()).padStart(2, '0'),
        'HH': String(date.getHours()).padStart(2, '0'),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'ss': String(date.getSeconds()).padStart(2, '0'),
    };
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => String(map[key]));
};

/**
 * 生成随机字符串
 *
 * 生成指定长度的随机字符串，由数字和字母组成。
 *
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 *
 * @example
 * const result = randomString(8);
 * console.log(result); // 输出类似 "a1b2c3d4"
 */
export const randomString = (length: number): string =>
    Math.random().toString(36).substr(2, length);

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
 * const debouncedFn = debounce(() => console.log('Debounced!'), 1000);
 * window.addEventListener('resize', debouncedFn);
 */
export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
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
 * const throttledFn = throttle(() => console.log('Throttled!'), 1000);
 * window.addEventListener('scroll', throttledFn);
 */
export const throttle = <T extends (...args: any[]) => void>(
    fn: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            fn(...args);
        }
    };
};

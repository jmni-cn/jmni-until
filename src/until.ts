export const generateUID = (): string => {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substring(2, 10)
    return timestamp + randomPart;
}
export const queryParams = (key: string) => {
    const search = window.location.search
    const searchParams = new URLSearchParams(search)
    return searchParams.get(key)
}

/**
 * 数组求交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 两数组的交集
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => arr2.includes(item));

/**
 * 数组求差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns arr1 中存在但 arr2 中不存在的元素
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => !arr2.includes(item));

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写后的字符串
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 驼峰转下划线
 * @param str 字符串
 * @returns 转换后的下划线字符串
 */
export const camelToSnake = (str: string): string =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * 下划线转驼峰
 * @param str 字符串
 * @returns 转换后的驼峰字符串
 */
export const snakeToCamel = (str: string): string =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * 时间日期工具函数
 */

/**
 * 格式化时间戳
 * @param timestamp 时间戳
 * @param format 格式化字符串，如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
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
 * 工具函数
 */

/**
 * 生成随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export const randomString = (length: number): string =>
    Math.random().toString(36).substr(2, length);

/**
 * 防抖函数
 * @param fn 执行的函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的函数
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
 * @param fn 执行的函数
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流后的函数
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

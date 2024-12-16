/**
 * 格式化时间戳为指定格式
 *
 * 兼容 date-fns 格式化字符串，比如 'yyyy-MM-dd HH:mm:ss'。
 *
 * @param {number} timestamp - 时间戳
 * @param {string} format - 格式化字符串，如 'yyyy-MM-dd HH:mm:ss' 或 date-fns 格式
 * @returns {string} 格式化后的日期字符串
 *
 * @example
 * const result = formatDate(1672531200000, 'yyyy-MM-dd');
 * console.log(result); // 输出 "2023-01-01"
 *
 * const result2 = formatDate(1672531200000, 'yyyy/MM/dd HH:mm');
 * console.log(result2); // 输出 "2023/01/01 00:00"
 */
export const formatDate = (timestamp: number, format: string): string => {
    const date = new Date(timestamp);
    const map: Record<string, string> = {
        'yyyy': String(date.getFullYear()),
        'yy': String(date.getFullYear()).slice(-2),
        'MM': String(date.getMonth() + 1).padStart(2, '0'),
        'M': String(date.getMonth() + 1),
        'dd': String(date.getDate()).padStart(2, '0'),
        'd': String(date.getDate()),
        'HH': String(date.getHours()).padStart(2, '0'),
        'H': String(date.getHours()),
        'hh': String(date.getHours() % 12 || 12).padStart(2, '0'),
        'h': String(date.getHours() % 12 || 12),
        'mm': String(date.getMinutes()).padStart(2, '0'),
        'm': String(date.getMinutes()),
        'ss': String(date.getSeconds()).padStart(2, '0'),
        's': String(date.getSeconds()),
    };
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const regex = new RegExp(keys.join('|'), 'g');

    // 替换格式字符串中的占位符
    return format.replace(regex, (key) => map[key]);
};

/**
 * 格式化时区偏移
 *
 * 获取当前设备的时区偏移，并以 `UTC±hh:mm` 格式返回。
 *
 * @returns {string} 格式化后的时区偏移字符串
 *
 * @example
 * const timeZone = formatTimeZoneOffset();
 * console.log(timeZone); // 输出类似 "UTC+08:00" 或 "UTC-05:00"
 */
export const formatTimeZoneOffset = (): string => {
    const date = new Date();
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetRemainingMinutes = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes > 0 ? '-' : '+';
    return `UTC${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetRemainingMinutes).padStart(2, '0')}`;
};

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

/**
 * 将日期格式化为指定时区的本地时间字符串
 *
 * 接收一个日期值、目标时区和语言环境（locale），将其格式化为 `yyyy-MM-dd HH:mm:ss` 字符串。
 * 所有参数都是可选的，默认格式为当前时间 + 中国时区（Asia/Shanghai）+ 中文格式（zh-CN）。
 *
 * @param {string | number | Date} [dateInput=new Date()] - 要格式化的时间（字符串、时间戳或 Date 对象）
 * @param {string} [timezone='Asia/Shanghai'] - 时区名称（例如 "UTC", "Asia/Shanghai", "America/New_York"）
 * @param {string} [locale='zh-CN'] - 语言区域设置，默认使用中文格式
 * @returns {string} 格式化后的时间字符串，格式为 `yyyy-MM-dd HH:mm:ss`
 *
 * @throws {Error} 如果提供了无效的时间或时区，将抛出错误
 *
 * @example
 * formatWithTimezone(); 
 * // 当前时间 + Asia/Shanghai + zh-CN 输出: "2025-04-16 15:00:00"
 *
 * @example
 * formatWithTimezone("2025-04-16T06:00:00Z", "UTC", "en-US");
 * // 输出: "2025-04-16 06:00:00"
 */
export const formatWithTimezone = (
    dateInput: string | number | Date = new Date(),
    timezone: string = 'Asia/Shanghai',
    locale: string = 'zh-CN'
  ): string => {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date input');
    }
  
    try {
      const formatter = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
  
      const parts = formatter.formatToParts(date);
      const dateMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
  
      return `${dateMap.year}-${dateMap.month}-${dateMap.day} ${dateMap.hour}:${dateMap.minute}:${dateMap.second}`;
    } catch (err) {
      throw new Error(`Invalid timezone: "${timezone}"`);
    }
  };
  
  
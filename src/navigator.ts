/**
 * 判断是否为移动端设备
 *
 * 检测用户代理字符串中是否包含常见的移动设备标识，以判断当前环境是否为移动端设备。
 *
 * @returns {boolean} 如果是移动端设备返回 `true`，否则返回 `false`
 *
 * @example
 * const isMobileDevice = isMobile();
 * console.log(isMobileDevice); // 在移动端返回 true，在桌面端返回 false
 */
export const isMobile = (): boolean => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i;
    return mobileRegex.test(userAgent);
};


/**
 * 时区到地区中文名称映射表
 */
export const timezoneToRegionMap: Record<string, string> = {
    // 亚洲
    "Asia/Shanghai": "中国",
    "Asia/Chongqing": "中国",
    "Asia/Harbin": "中国",
    "Asia/Urumqi": "中国",
    "Asia/Tokyo": "日本",
    "Asia/Seoul": "韩国",
    "Asia/Hong_Kong": "中国香港",
    "Asia/Taipei": "中国台湾",
    "Asia/Singapore": "新加坡",
    "Asia/Bangkok": "泰国",
    "Asia/Jakarta": "印度尼西亚",
    "Asia/Kuala_Lumpur": "马来西亚",
    "Asia/Manila": "菲律宾",
    "Asia/Kolkata": "印度",
    "Asia/Dubai": "阿联酋",
    "Asia/Tehran": "伊朗",
    "Asia/Riyadh": "沙特阿拉伯",
    "Asia/Kathmandu": "尼泊尔",
    "Asia/Yangon": "缅甸",
    "Asia/Tashkent": "乌兹别克斯坦",
    "Asia/Almaty": "哈萨克斯坦",
    "Asia/Baghdad": "伊拉克",
    "Asia/Beirut": "黎巴嫩",
    "Asia/Damascus": "叙利亚",
    "Asia/Jerusalem": "以色列",

    // 欧洲
    "Europe/London": "英国",
    "Europe/Paris": "法国",
    "Europe/Berlin": "德国",
    "Europe/Madrid": "西班牙",
    "Europe/Rome": "意大利",
    "Europe/Moscow": "俄罗斯",
    "Europe/Istanbul": "土耳其",
    "Europe/Athens": "希腊",
    "Europe/Amsterdam": "荷兰",
    "Europe/Brussels": "比利时",
    "Europe/Stockholm": "瑞典",
    "Europe/Warsaw": "波兰",
    "Europe/Vienna": "奥地利",
    "Europe/Zurich": "瑞士",
    "Europe/Dublin": "爱尔兰",
    "Europe/Helsinki": "芬兰",
    "Europe/Oslo": "挪威",

    // 美洲
    "America/New_York": "美国（东部）",
    "America/Chicago": "美国（中部）",
    "America/Denver": "美国（山区）",
    "America/Los_Angeles": "美国（太平洋）",
    "America/Anchorage": "美国（阿拉斯加）",
    "America/Honolulu": "美国（夏威夷）",
    "America/Toronto": "加拿大",
    "America/Vancouver": "加拿大",
    "America/Mexico_City": "墨西哥",
    "America/Bogota": "哥伦比亚",
    "America/Lima": "秘鲁",
    "America/Santiago": "智利",
    "America/Buenos_Aires": "阿根廷",
    "America/Sao_Paulo": "巴西",

    // 非洲
    "Africa/Cairo": "埃及",
    "Africa/Johannesburg": "南非",
    "Africa/Nairobi": "肯尼亚",
    "Africa/Lagos": "尼日利亚",
    "Africa/Casablanca": "摩洛哥",

    // 大洋洲
    "Australia/Sydney": "澳大利亚（悉尼）",
    "Australia/Melbourne": "澳大利亚（墨尔本）",
    "Australia/Brisbane": "澳大利亚（布里斯班）",
    "Australia/Perth": "澳大利亚（珀斯）",
    "Pacific/Auckland": "新西兰",
    "Pacific/Fiji": "斐济",
    "Pacific/Guam": "关岛",

    // 其他
    "UTC": "协调世界时",
    "Etc/GMT": "格林威治标准时间"
};

/**
 * 根据时区字符串返回对应地区中文名称
 *
 * @param {string} timezone - IANA 时区标识符（如 "Asia/Shanghai"）
 * @returns {string} 对应的中文地区名称，找不到时返回原始时区字符串
 *
 * @throws {Error} 如果输入为空或不是字符串，则抛出异常
 *
 * @example
 * getRegionFromTimezone("Asia/Tokyo"); // 返回 "日本"
 * getRegionFromTimezone("Europe/Paris"); // 返回 "法国"
 * getRegionFromTimezone("Unknown/Timezone"); // 返回 "Unknown/Timezone"
 */
export function getRegionFromTimezone(timezone: string): string {
    if (typeof timezone !== 'string' || !timezone.trim()) {
        throw new Error('Invalid timezone input. Expected non-empty string.');
    }

    const normalized = timezone.trim();
    return timezoneToRegionMap[normalized] || normalized;
}

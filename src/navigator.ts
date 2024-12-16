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

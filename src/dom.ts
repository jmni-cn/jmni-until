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
 * const page = queryParams('page')
 * console.log(page) // 输出 "2"
 *
 * const size = queryParams('size')
 * console.log(size) // 输出 "10"
 *
 * const nonExistent = queryParams('nonExistent')
 * console.log(nonExistent) // 输出 null
 */
export const queryParams = (key: string): string | null => {
    const search = window.location.search
    const searchParams = new URLSearchParams(search)
    return searchParams.get(key)
}


/**
 * 更新当前页面的 URL 查询参数
 *
 * 支持单个键值对或传入对象进行批量更新，更新后不刷新页面，仅修改地址栏内容。
 * 如果某个参数的值为 `undefined` 或 `null`，该参数将被从 URL 中移除。
 *
 * @param {string | Record<string, string | number | null | undefined>} key - 查询参数的键，或包含多个参数的对象
 * @param {string | number | null | undefined} [value] - 查询参数的值，仅在 key 为字符串时使用
 * @returns {string} 返回更新后的完整 URL 字符串
 *
 * @example
 * updateQueryParams("page", 2);
 * // URL 变为 "...?page=2"
 *
 * @example
 * updateQueryParams({ page: 1, keyword: "test" });
 * // URL 变为 "...?page=1&keyword=test"
 *
 * @example
 * updateQueryParams("page", null);
 * // 删除 page 参数
 */
export function updateQueryParams(
    key: string | Record<string, string | number | null | undefined>,
    value?: string | number | null
  ): string {
    const url = new URL(window.location.href);
  
    const isPlainObject = (val: unknown): val is Record<string, any> =>
      Object.prototype.toString.call(val) === '[object Object]';
  
    if (isPlainObject(key)) {
      // 批量更新参数
      Object.entries(key).forEach(([param, val]) => {
        if (val === undefined || val === null) {
          url.searchParams.delete(param);
        } else {
          url.searchParams.set(param, String(val));
        }
      });
    } else if (typeof key === 'string') {
      // 单个参数处理
      if (value === undefined || value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  
    // 不刷新页面，更新地址栏
    window.history.replaceState({}, '', url.toString());
    return url.toString();
  }
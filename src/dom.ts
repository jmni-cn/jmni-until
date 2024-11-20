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

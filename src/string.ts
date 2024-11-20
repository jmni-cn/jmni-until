/**
 * 生成全局唯一标识符 (UID)
 *
 * 使用当前时间戳和随机字符串的组合，确保生成的字符串具有唯一性。
 *
 * @returns {string} 一个由时间戳和随机字符串组成的唯一标识符
 *
 * @example
 * const uid = generateUID()
 * console.log(uid) // 类似 "kxidq52e9xr73mpk"
 */
export const generateUID = (): string => {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substring(2, 10)
    return timestamp + randomPart
}

/**
 * 生成随机字符串
 *
 * 生成指定长度的随机字符串，由数字和字母组成。
 *
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 *
 * @example
 * const result = randomString(8)
 * console.log(result) // 输出类似 "a1b2c3d4"
 */
export const randomString = (length: number): string =>
    Math.random().toString(36).substr(2, length)

/**
 * 将字符串首字母大写
 *
 * 返回首字母大写后的字符串。
 *
 * @param {string} str - 输入字符串
 * @returns {string} 首字母大写后的字符串
 *
 * @example
 * const result = capitalize('hello')
 * console.log(result) // 输出 "Hello"
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1)

/**
 * 将下划线字符串转换为驼峰格式
 *
 * @param {string} str - 输入字符串
 * @returns {string} 转换后的驼峰字符串
 *
 * @example
 * const result = snakeToCamel('snake_case_string')
 * console.log(result) // 输出 "snakeCaseString"
 */
export const snakeToCamel = (str: string): string =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())

/**
 * 将驼峰字符串转换为下划线格式
 *
 * @param {string} str - 输入字符串
 * @returns {string} 转换后的下划线字符串
 *
 * @example
 * const result = camelToSnake('camelCaseString')
 * console.log(result) // 输出 "camel_case_string"
 */
export const camelToSnake = (str: string): string =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)


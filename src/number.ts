/**
 * 补全个位数为两位数字
 *
 * 如果输入的数字是个位数（无论是数字类型还是字符串类型），则在前面补 `0`；
 * 十位及以上数字保持原样。如果输入为非数字的字符串（如字母），则返回 `Invalid Input`。
 *
 * @param {number | string} num - 输入的数字，可以是数字类型或字符串数字
 * @returns {string} 补全后的两位字符串或错误提示
 *
 * @example
 * const result1 = padZero(5)
 * console.log(result1) // 输出 "05"
 *
 * const result2 = padZero("7")
 * console.log(result2) // 输出 "07"
 *
 * const result3 = padZero(15)
 * console.log(result3) // 输出 "15"
 *
 * const result4 = padZero("123")
 * console.log(result4) // 输出 "123"
 *
 * const result5 = padZero("abc")
 * console.log(result5) // 输出 "Invalid Input"
 */
export const padZero = (num: number | string): string => {
    if (isNaN(Number(num))) {
        console.error("Invalid Input")
        return "Invalid Input"
    }
    return String(Number(num)).padStart(2, "0");
}

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
 * const array1 = [1, 2, 3, 4]
 * const array2 = [3, 4, 5, 6]
 * const result = difference(array1, array2)
 * console.log(result) // 输出 [1, 2]
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => !arr2.includes(item))
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
 * const array1 = [1, 2, 3, 4]
 * const array2 = [3, 4, 5, 6]
 * const result = intersection(array1, array2)
 * console.log(result) // 输出 [3, 4]
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] =>
    arr1.filter((item) => arr2.includes(item))


/**
 * 数组去重
 *
 * 使用 `Array.reduce` 方法实现数组去重，保留数组中第一次出现的唯一值。
 *
 * @template T
 * @param {T[]} array - 需要去重的数组
 * @returns {T[]} 去重后的新数组
 *
 * @example
 * const numbers = [1, 2, 2, 3, 4, 4, 5];
 * const uniqueNumbers = uniqueArray(numbers);
 * console.log(uniqueNumbers); // 输出 [1, 2, 3, 4, 5]
 *
 * @example
 * const strings = ["apple", "banana", "apple", "orange"];
 * const uniqueStrings = uniqueArray(strings);
 * console.log(uniqueStrings); // 输出 ["apple", "banana", "orange"]
 */
export const uniqueArray = <T>(array: T[]): T[] => {
    return array.reduce((accumulator: T[], current) => {
        if (accumulator.indexOf(current) === -1) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
};

/**
 * 对数组进行排序
 *
 * 使用 `Array.sort` 方法对数组进行升序排序，支持数字和字符串数组的排序。
 *
 * @template T
 * @param {T[]} array - 需要排序的数组
 * @param {(a: T, b: T) => number} [compareFn] - 可选的比较函数，如果未提供，将进行默认排序。
 * @returns {T[]} 排序后的数组
 *
 * @example
 * const numbers = [5, 3, 8, 1];
 * const sortedNumbers = sortArray(numbers);
 * console.log(sortedNumbers); // 输出 [1, 3, 5, 8]
 *
 * @example
 * const strings = ["banana", "apple", "orange"];
 * const sortedStrings = sortArray(strings);
 * console.log(sortedStrings); // 输出 ["apple", "banana", "orange"]
 *
 * @example
 * const customSorted = sortArray([3, 1, 4, 2], (a, b) => b - a);
 * console.log(customSorted); // 输出 [4, 3, 2, 1]
 */
export const sortArray = <T>(
    array: T[],
    compareFn?: (a: T, b: T) => number
): T[] => {
    return [...array].sort(compareFn);
};

/**
 * 数组扁平化
 *
 * 使用递归方法将嵌套的数组扁平化为单层数组。
 *
 * @template T
 * @param {Array<T | T[]>} array - 需要扁平化的数组，可以包含嵌套数组。
 * @returns {T[]} 扁平化后的单层数组
 *
 * @example
 * const nestedArray = [1, [2, [3, [4]], 5]];
 * const flatArray = flattenArray(nestedArray);
 * console.log(flatArray); // 输出 [1, 2, 3, 4, 5]
 *
 * @example
 * const simpleArray = [1, 2, 3];
 * const flatArray = flattenArray(simpleArray);
 * console.log(flatArray); // 输出 [1, 2, 3]
 */
export const flattenArray = <T>(array: Array<T | T[]>): T[] => {
    return array.reduce<T[]>((accumulator, current) => {
        return Array.isArray(current)
            ? accumulator.concat(flattenArray(current)) // 递归处理嵌套数组
            : accumulator.concat(current); // 非数组直接添加
    }, []);
};

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

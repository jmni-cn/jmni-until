# JMNI Utils

一个轻量级、高性能的 JavaScript/TypeScript 工具函数库，提供了一系列常用的工具函数，帮助开发者提高开发效率。

[![npm version][npm-image]][npm-url]
[![license][l-image]][l-url]
[![TypeDoc](https://img.shields.io/badge/TypeDoc-Documentation-blue.svg)](https://jmni-until.vercel.app)

[npm-image]: https://img.shields.io/npm/v/jmni
[npm-url]: https://npmjs.org/package/jmni
[l-image]: https://img.shields.io/npm/l/jmni
[l-url]: https://github.com/jmni-cn/jmni-until

## 文档

- [在线文档](https://jmni-until.vercel.app)
- [示例代码](https://github.com/jmni-cn/jmni-until/tree/main/example)

## 特性

- 🚀 轻量级：按需引入，体积小巧
- 📦 模块化：支持 ES Module、CommonJS 和 UMD 格式
- 🔒 类型安全：使用 TypeScript 编写，提供完整的类型定义
- 📚 完整文档：使用 TypeDoc 生成详细的 API 文档
- 🧪 高质量：经过实践检验的可靠代码

## 安装

```bash
npm install jmni
# 或者
yarn add jmni
```

## 使用

```typescript
// 按需引入
import { debounce, throttle } from 'jmni';

// 或者引入全部
import * as jmni from 'jmni';
```

## 功能模块

### 1. 防抖和节流 (until.ts)

提供函数执行频率控制的工具函数。

#### debounce

防抖函数，在指定时间内多次调用时，仅执行最后一次，可选 `immediate` 选项，使第一次调用立即执行。

```typescript
function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
    immediate: boolean = false
): ((...args: Parameters<T>) => void) & { cancel: () => void }
```

**参数：**
- `fn`: 需要防抖处理的函数
- `delay`: 推迟执行的等待时间（毫秒）
- `immediate`: 是否在第一次调用时立即执行（可选，默认为 false）

**返回值：**
- 防抖后的函数，并附带 `cancel` 方法可手动取消防抖

**示例：**
```typescript
const log = debounce(() => console.log("Executed"), 300);
window.addEventListener("resize", log); // 300ms 内重复触发时，仅最后一次执行

const logImmediate = debounce(() => console.log("Immediate Execution"), 300, true);
logImmediate(); // 立即执行一次，后续调用仍需等待 300ms
```

#### throttle

节流函数，限制函数在指定时间间隔内只能执行一次。

```typescript
function throttle<T extends (...args: any[]) => void>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void
```

**参数：**
- `fn`: 要执行的函数
- `limit`: 节流时间间隔（毫秒）

**返回值：**
- 节流后的函数

**示例：**
```typescript
const throttledFn = throttle(() => console.log('Throttled!'), 1000)
window.addEventListener('scroll', throttledFn)
```

### 2. DOM 操作 (dom.ts)

提供 URL 参数处理相关的工具函数。

#### queryParams

获取 URL 查询参数值。

```typescript
function queryParams(key: string): string | null
```

**参数：**
- `key`: 要获取的查询参数的名称

**返回值：**
- 查询参数的值，如果不存在则返回 null

**示例：**
```typescript
// 假设当前 URL 是 'http://example.com?page=2&size=10'
const page = queryParams('page')
console.log(page) // 输出 "2"

const size = queryParams('size')
console.log(size) // 输出 "10"
```

#### updateQueryParams

更新当前页面的 URL 查询参数，支持单个或批量更新。

```typescript
function updateQueryParams(
    key: string | Record<string, string | number | null | undefined>,
    value?: string | number | null
): string
```

**参数：**
- `key`: 查询参数的键，或包含多个参数的对象
- `value`: 查询参数的值，仅在 key 为字符串时使用

**返回值：**
- 返回更新后的完整 URL 字符串

**示例：**
```typescript
updateQueryParams("page", 2);
// URL 变为 "...?page=2"

updateQueryParams({ page: 1, keyword: "test" });
// URL 变为 "...?page=1&keyword=test"
```

### 3. 验证工具 (Verif.ts)

提供加密和签名相关的工具函数。

#### genRanHex

生成随机的十六进制字符串。

```typescript
function genRanHex(size: number): string
```

**参数：**
- `size`: 生成的十六进制字符串长度

**返回值：**
- 生成的随机十六进制字符串

**示例：**
```typescript
const hex = genRanHex(8);
console.log(hex); // 可能输出 "a3f9c1b2"
```

#### generateSignature

生成 HMAC-SHA256 签名（支持浏览器环境）。

```typescript
function generateSignature(secretKey?: string): Promise<{
    timestamp: number;
    nonce: string;
    signature: string;
}>
```

**参数：**
- `secretKey`: 用于签名的密钥（可选，默认为 'jmni-until'）

**返回值：**
- 包含 timestamp、nonce 和 signature 的对象

**示例：**
```typescript
const signatureParams = await generateSignature();
console.log(signatureParams);
// 输出：
// {
//   timestamp: 1710772974000,  // 13位毫秒时间戳
//   nonce: "a1b2c3d4e5f6g7h8", // 16位随机 hex 字符串
//   signature: "d2e3f9c1b2a4..." // 64位 HMAC-SHA256 签名 hex 字符串
// }
```

### 4. 日期处理 (date.ts)

提供日期格式化相关的工具函数。

#### formatDate

格式化时间戳为指定格式。

```typescript
function formatDate(timestamp: number, format: string): string
```

**参数：**
- `timestamp`: 时间戳
- `format`: 格式化字符串，如 'yyyy-MM-dd HH:mm:ss'

**返回值：**
- 格式化后的日期字符串

**示例：**
```typescript
const result = formatDate(1672531200000, 'yyyy-MM-dd');
console.log(result); // 输出 "2023-01-01"
```

#### formatTimeZoneOffset

格式化时区偏移。

```typescript
function formatTimeZoneOffset(): string
```

**返回值：**
- 格式化后的时区偏移字符串

**示例：**
```typescript
const timeZone = formatTimeZoneOffset();
console.log(timeZone); // 输出类似 "UTC+08:00" 或 "UTC-05:00"
```

### 5. 浏览器信息 (navigator.ts)

提供浏览器环境检测工具函数。

#### isMobile

判断是否为移动端设备。

```typescript
function isMobile(): boolean
```

**返回值：**
- 如果是移动端设备返回 true，否则返回 false

**示例：**
```typescript
const isMobileDevice = isMobile();
console.log(isMobileDevice); // 在移动端返回 true，在桌面端返回 false
```

### 6. 数组操作 (array.ts)

提供数组处理相关的工具函数。

#### uniqueArray

数组去重。

```typescript
function uniqueArray<T>(array: T[]): T[]
```

**参数：**
- `array`: 需要去重的数组

**返回值：**
- 去重后的新数组

**示例：**
```typescript
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = uniqueArray(numbers);
console.log(uniqueNumbers); // 输出 [1, 2, 3, 4, 5]
```

#### sortArray

对数组进行排序。

```typescript
function sortArray<T>(
    array: T[],
    compareFn?: (a: T, b: T) => number
): T[]
```

**参数：**
- `array`: 需要排序的数组
- `compareFn`: 可选的比较函数

**返回值：**
- 排序后的数组

**示例：**
```typescript
const numbers = [5, 3, 8, 1];
const sortedNumbers = sortArray(numbers);
console.log(sortedNumbers); // 输出 [1, 3, 5, 8]
```

### 7. 字符串处理 (string.ts)

提供字符串处理相关的工具函数。

#### generateUID

生成全局唯一标识符。

```typescript
function generateUID(): string
```

**返回值：**
- 一个由时间戳和随机字符串组成的唯一标识符

**示例：**
```typescript
const uid = generateUID()
console.log(uid) // 类似 "kxidq52e9xr73mpk"
```

#### kebabCase

将字符串转换为 kebab-case 格式。

```typescript
function kebabCase(str: string): string
```

**参数：**
- `str`: 输入的字符串

**返回值：**
- 转换后的 kebab-case 字符串

**示例：**
```typescript
const result = kebabCase("HelloWorld");
console.log(result); // 输出 "hello-world"
```

### 8. 数字处理 (number.ts)

提供数字处理相关的工具函数。

#### padZero

补全个位数为两位数字。

```typescript
function padZero(num: number | string): string
```

**参数：**
- `num`: 输入的数字，可以是数字类型或字符串数字

**返回值：**
- 补全后的两位字符串或错误提示

**示例：**
```typescript
const result1 = padZero(5)
console.log(result1) // 输出 "05"

const result2 = padZero("7")
console.log(result2) // 输出 "07"
```

## 开发

```bash
# 安装依赖
npm install
# 或者
yarn

# 构建
npm run build
# 或者
yarn build

# 生成文档
npm run docs
# 或者
yarn docs
```

## 版本历史

查看 [CHANGELOG.md](CHANGELOG.md) 了解详细的版本更新历史。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

ISC License




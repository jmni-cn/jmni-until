/**
 * 生成随机的十六进制字符串
 *
 * @param {number} size - 生成的十六进制字符串长度
 * @returns {string} 生成的随机十六进制字符串
 *
 * @example
 * const hex = genRanHex(8);
 * console.log(hex); // 可能输出 "a3f9c1b2"
 */
export const genRanHex = (size: number): string =>
    [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

/**
 * 将字符串转换为 Uint8Array
 *
 * @param {string} str - 需要转换的字符串
 * @returns {Uint8Array} 转换后的 Uint8Array
 *
 * @example
 * const uint8Array = strToUint8Array("hello");
 * console.log(uint8Array); // 输出 Uint8Array(5) [104, 101, 108, 108, 111]
 */
export const strToUint8Array = (str: string): Uint8Array => new TextEncoder().encode(str);

/**
 * 将 ArrayBuffer 转换为十六进制字符串
 *
 * @param {ArrayBuffer} buffer - 需要转换的 ArrayBuffer
 * @returns {string} 转换后的十六进制字符串
 *
 * @example
 * const buffer = new Uint8Array([1, 2, 3]).buffer;
 * const hex = bufferToHex(buffer);
 * console.log(hex); // 可能输出 "010203"
 */
export const bufferToHex = (buffer: ArrayBuffer): string =>
    Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

/**
 * 浏览器环境下生成 HMAC-SHA256 签名
 *
 * 生成包含 `timestamp`、`nonce` 和 `signature` 的签名参数对象。
 *
 * @param {string} [secretKey='jmni-until'] - 用于签名的密钥
 * @returns {Promise<{ timestamp: number; nonce: string; signature: string }>} 
 * 包含 `timestamp`（时间戳，毫秒级）、`nonce`（16位随机十六进制字符串）和 `signature`（HMAC-SHA256 签名字符串）的对象
 *
 * @example
 * const signatureParams = await generateSignature();
 * console.log(signatureParams);
 * // 输出：
 * // {
 * //   timestamp: 1710772974000,  // 13位毫秒时间戳
 * //   nonce: "a1b2c3d4e5f6g7h8", // 16位随机 hex 字符串
 * //   signature: "d2e3f9c1b2a4..." // 64位 HMAC-SHA256 签名 hex 字符串
 * // }
 */
export const generateSignature = async (secretKey = 'jmni-until'): Promise<{
    timestamp: number;
    nonce: string;
    signature: string;
  }> => {
    const timestamp = Date.now(); // 毫秒级时间戳 (number)
    const nonce = genRanHex(16); // 生成 16 位随机 hex 字符串
    const stringToSign = `timestamp=${timestamp}&nonce=${nonce}`;
  
    // 导入密钥
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      strToUint8Array(secretKey),
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );
  
    // 计算签名
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      strToUint8Array(stringToSign)
    );
  
    const signature = bufferToHex(signatureBuffer); // 转换为 hex 格式字符串
  
    return { timestamp, nonce, signature };
  };
  



// import crypto from 'crypto';

/**
 * node环境下生成 HMAC-SHA256 签名
 *
 * 生成包含 `timestamp`、`nonce` 和 `signature` 的签名参数对象。
 * 签名的计算方式为：
 * - 使用 `HMAC-SHA256` 计算 `timestamp` 和 `nonce` 组合字符串的哈希值
 * - 只取哈希值的偶数位字符，形成最终的 `signature`
 *
 * @param {string} [secretKey='pe950c0046ffef87'] - 用于签名的密钥
 * @returns {Record<string, string | number>} 包含 `timestamp`、`nonce` 和 `signature` 的对象
 *
 * @example
 * const signatureParams = generateSignature();
 * console.log(signatureParams);
 * // 输出：
 * // {
 * //   timestamp: 1710772974000,
 * //   nonce: "a1b2c3d4e5f6g7h8",
 * //   signature: "a3b5c7..."
 * // }
 */
// export const generateSignatureForNODE = (secretKey = 'jmni-until'): Record<string, string | number> => {
//   const timestamp = Date.now();
//   const nonce = genRanHex(16);
//   const stringToSign = `timestamp=${timestamp}&nonce=${nonce}`;

//   // 计算 HMAC-SHA256 签名
//   const signature = crypto
//     .createHmac('sha256', secretKey)
//     .update(stringToSign)
//     .digest('hex');

//   // 只取偶数索引的字符
//   let result = '';
//   for (let i = 0; i < signature.length; i++) {
//     if (i % 2 === 0) {
//       result += signature[i];
//     }
//   }

//   return {
//     timestamp,
//     nonce,
//     signature: result,
//   };
// };

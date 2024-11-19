const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

module.exports = [
    {
        input: './src/index.ts',
        output: [
            {
                dir: 'lib',
                format: 'cjs',
                entryFileNames: '[name].cjs.js',
                sourcemap: false,
            },
            {
                dir: 'lib',
                format: 'esm',
                entryFileNames: '[name].esm.js',
                sourcemap: false,
            },
            {
                dir: 'lib',
                format: 'umd',
                entryFileNames: '[name].umd.js',
                name: 'FE_utils',
                sourcemap: false,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ module: "ESNext" }),
            terser({
                compress: {
                    drop_console: true, // 移除所有 console.* 调用
                    drop_debugger: true, // 移除所有 debugger 语句
                    pure_funcs: ['console.log'], // 移除指定函数调用
                },
                mangle: {
                    properties: true, // 混淆属性名
                },
                format: {
                    comments: false, // 移除所有注释
                },
            })
        ],
    }
];

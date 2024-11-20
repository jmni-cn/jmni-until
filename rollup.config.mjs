// import { readFileSync } from 'fs';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescriptEngine from 'typescript';

// const packageJson = JSON.parse(readFileSync('./package.json'));

export default defineConfig([
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        sourcemap: false,
    },
    {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: false,
    },
    {
        dir: 'dist',
        format: 'umd',
        entryFileNames: '[name].umd.js',
        name: 'jmni',
        globals: {
            jmni: 'jmni'
        },
        compact: true,
        sourcemap: false,
    },
    ],
    plugins: [
      external({ includeDependencies: true }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        typescript: typescriptEngine,
        sourceMap: false,
        exclude: [
          'coverage',
          '.storybook',
          'storybook-static',
          'config',
          'dist',
          'node_modules/**',
          '*.cjs',
          '*.mjs',
          '**/__snapshots__/*',
          '**/__tests__',
          '**/*.test.js+(|x)',
          '**/*.test.ts+(|x)',
          '**/*.mdx',
          '**/*.story.ts+(|x)',
          '**/*.story.js+(|x)',
          '**/*.stories.ts+(|x)',
          '**/*.stories.js+(|x)',
          'setupTests.ts',
          'vitest.config.ts',
        ],
      }),
      url(),
      terser(),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.(sc|sa|c)ss$/],
    plugins: [dts()],
  },
]);

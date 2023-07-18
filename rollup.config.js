import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ignoreImport from 'rollup-plugin-ignore-import';
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import { string } from 'rollup-plugin-string';

const plugins = [
  ignoreImport({
    // Ignore all .scss and .css file imports while building the bundle
    extensions: ['.scss', '.less', '.jpg', '.png', '.html?raw'],
    // Optional: replace body for ignored files. Default value is "export default undefined;"
    body: 'export default undefined;'
  }),
  nodeResolve(),
  commonjs(),
  typescript(),
  string({
    include: 'src/template/index.html',
  }),
  postcss({
    extract: path.resolve("release/mini-player.css"),
    minimize: true,
    plugins: [
      postcssUrl({
        url: "inline"
      })
    ]
  }),
  terser()
]


export default [
  // esm js
  {
    input: "./src/pack/FullPack.ts",
    output: [
      {
        file: 'release/mini-player.full.esm.js',
        format: 'es'
      }
    ],
    plugins
  },
  // without pvue
  {
    input: "./src/pack/WithoutPvue.ts",
    output: [
      {
        file: 'release/mini-player.esm.js',
        format: 'es'
      }
    ],
    plugins
  }
]

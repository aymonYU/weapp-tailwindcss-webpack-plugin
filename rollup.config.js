import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('rollup').RollupOptions } */
const sharedConfig = {
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: isDev, declaration: false })
  ],
  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : [])]
}

/** @type {Array<import('rollup').RollupOptions> } */
const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: isDev
        // exports: 'auto'
      }
      // { format: 'esm', file: pkg.module, sourcemap: isDev }
    ],
    ...sharedConfig
  },
  {
    input: 'src/replace.ts',
    output: [
      {
        file: 'dist/replace.js',
        format: 'esm',
        sourcemap: isDev
        // exports: 'auto'
      }
      // { format: 'esm', file: pkg.module, sourcemap: isDev }
    ],
    ...sharedConfig
  }
]

export default config

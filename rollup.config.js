import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import rolllupJson from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const input = 'src/client-scripts/index.js';
const plugins = [
    rolllupJson(),
    resolve({
        browser: true,
        preferBuiltins: false
    }), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    typescript({
        compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
        tsconfig: false,
        filterRoot: 'src/client-scripts',
    }),
    babel({
        exclude: 'node_modules/**',
    }),
]

export default [
    // browser-friendly UMD build
    {
        input,
        output: {
            name: 'howLongUntilLunch',
            file: pkg.browserScript,
            format: 'umd',
            sourcemap: 'inline',
        },
        plugins,
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input,
        external: ['ms'],
        plugins,
        output: [
            { file: pkg.mainScript, format: 'cjs', sourcemap: 'inline', },
            { file: pkg.moduleScript, format: 'es', sourcemap: 'inline' }
        ],
    },
    {
        input: 'src/client-scripts/logic/messenger/worker.js',
        output: {
            name: 'worker',
            file: 'public/build/worker.js',
            format: 'umd',
            sourcemap: 'inline',
        },
        plugins,
    }
];
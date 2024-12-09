// rollup.config.js
import babel from 'rollup-plugin-babel';
import clean from 'rollup-plugin-clean';
import commonjs from 'rollup-plugin-commonjs';
import hash from 'rollup-plugin-hash';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss-with-hash';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import stylus from 'rollup-plugin-stylus-compiler';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import { config as dotenv } from 'dotenv';
import { resolve } from 'path';
import react from 'react';
import reactDom from 'react-dom';

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = NODE_ENV !== "production" ? "./dist/dev.js" : `./dist/${pkg.name}.js`;
dotenv({ path: resolve(process.cwd(), '../../.env') });
const { API_BASE_URL } = process.env;


const plugins = [
  clean(),
  replace({
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    "process.env.API_BASE_URL": JSON.stringify(API_BASE_URL),
  }),
  babel({
    exclude: ["node_modules/**", "*.elm"],
  }),
  nodeResolve({
    browser: true,
    preferBuiltins: true
  }),
  commonjs({
    include: [
      'node_modules/**',
    ],
    exclude: [
      'node_modules/process-es6/**',
    ],
    namedExports: {
      'react': Object.keys(react),
      'react-dom': Object.keys(reactDom),
      'node_modules/mf-maestro/dist/index.js': [
        'MicroAppComponent',
        'startMediator'
      ],
    }
  }),
  typescript(),
  json(),
  stylus(),
  postcss({
    extract: true,
    include: '**/*.css',
    modules: false,
    sourceMap: true,
    ...(process.env.NODE_ENV === 'production' && {
      hash: true,
      minimize: true,
    })
  })
];

if (process.env.START_SERVER === "true") {
  plugins.push(
    serve({
      contentBase: ['dist', 'public'],
      historyApiFallback: true,
      host: 'localhost',
      port: process.env.PORT || 4001,
    })
  );
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify({ sourcemap: true }));
  plugins.push(hash({
    dest: `./dist/${pkg.name}.[hash:10].js`,
    replace: true,
  }));
}


export default {
  input: 'src/app.tsx',
  output: {
    file: outputFile,
    format: 'iife',
    sourcemap: true,
  },
  plugins,
}

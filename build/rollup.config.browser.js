import base, {banner} from './rollup.config.base';
import {uglify} from 'rollup-plugin-uglify';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/KCDM.min.js',
    format: 'iife',
    banner
  },
  name: 'KCDM'
});

config.plugins.push(uglify());

export default config;

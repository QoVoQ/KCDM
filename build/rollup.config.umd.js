import base, {banner} from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/kcdm.umd.js',
    format: 'umd',
    banner
  },
  name: 'kcdm'
});

export default config;

import base, {banner} from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/KCDM.umd.js',
    format: 'umd',
    banner
  },
  name: 'KCDM'
});

export default config;

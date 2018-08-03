import {version} from '../package.json';
import buble from 'rollup-plugin-buble';

export const banner = `/**
 * kcdm v${version}
 * https://github.com/QoVoQ/kcdm
 * @license MIT
 */`;

export default {
  input: 'src/index.js',
  plugins: [buble()]
};

import {version} from '../package.json';
import buble from 'rollup-plugin-buble';

export const banner = `/**
 * KCDM v${version}
 * https://github.com/QoVoQ/KCDM
 * @license MIT
 */`;

export default {
  input: 'src/index.js',
  plugins: [buble()]
};

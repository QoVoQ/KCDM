/**
 * kcdm v1.0.0
 * https://github.com/QoVoQ/kcdm
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.kcdm = {})));
}(this, (function (exports) { 'use strict';

  var SimpleCrypto = require('simple-crypto-js').default;
  var OBJ_TO_DECIPHER = require('../output/CIPHERED.json');
  // const OBJ_TO_DECIPHER = {};

  var ITERATION = 5;
  var encrypt = function (input, cryptoObj) { return cryptoObj.encrypt(input); };

  var decrypt = function (input, cryptoObj) { return cryptoObj.decrypt(input); };

  var traverse = function (cryptoObj, raw, isEncryption, result) {
    if ( isEncryption === void 0 ) isEncryption = true;
    if ( result === void 0 ) result = {};

    for (var key in raw) {
      // console.log(`---${key}---`);
      if (typeof raw[key] === 'object') {
        result[key] = {};
        traverse(cryptoObj, raw[key], isEncryption, result[key]);
      } else {
        result[key] = isEncryption
          ? encrypt(raw[key], cryptoObj)
          : decrypt(raw[key], cryptoObj);
      }
    }
    return result;
  };

  var decipherObj = function (obj, secret) {
    var simpleCrypto = new SimpleCrypto(secret);
    simpleCrypto._iterations = ITERATION;

    return traverse(simpleCrypto, obj, false);
  };

  var cipherObj = function (obj, secret) {
    var simpleCrypto = new SimpleCrypto(secret);
    simpleCrypto._iterations = ITERATION;

    return traverse(simpleCrypto, obj, true);
  };

  var getDomains = function (secret) { return decipherObj(OBJ_TO_DECIPHER, secret); };

  var getProjectPath = function (secret, env) {
    if ( env === void 0 ) env = 'TEST';

    var DOMAIN = getDomains(secret);

    var SECOND_LEVEL_DOMAIN = DOMAIN[env].SECOND_LEVEL_DOMAIN;
    var THIRD_LEVEL_DOMAIN = DOMAIN[env].THIRD_LEVEL_DOMAIN;

    var DOMAIN_SUFFIX = THIRD_LEVEL_DOMAIN + "." + SECOND_LEVEL_DOMAIN;

    var KCHAIN_DOMAIN = "//" + DOMAIN_SUFFIX;
    var EXPLORER_DOMAIN = "//explorer." + DOMAIN_SUFFIX;
    var FINCHAIN_DOMAIN = "//finchain." + DOMAIN_SUFFIX;
    var NCC_DOMAIN = "//ncc." + DOMAIN_SUFFIX;
    var ICHAIN_DOMAIN = "//ichain." + DOMAIN_SUFFIX;

    return {
      DOMAIN_SUFFIX: DOMAIN_SUFFIX,
      KCHAIN_DOMAIN: KCHAIN_DOMAIN,
      EXPLORER_DOMAIN: EXPLORER_DOMAIN,
      FINCHAIN_DOMAIN: FINCHAIN_DOMAIN,
      NCC_DOMAIN: NCC_DOMAIN,
      ICHAIN_DOMAIN: ICHAIN_DOMAIN,
      KCHAIN: {
        INDEX: ("" + KCHAIN_DOMAIN),
        EXPERIENCE: (KCHAIN_DOMAIN + "/experience")
      },
      ICHAIN: {
        INDEX: ("" + ICHAIN_DOMAIN)
      },
      EXPLORER: {
        INDEX: EXPLORER_DOMAIN,
        SEARCH: (EXPLORER_DOMAIN + "/#/search/")
      },
      NCC: {
        INDEX: NCC_DOMAIN,
        VIP: (NCC_DOMAIN + "/vip")
      },
      FINCHAIN: {
        INDEX: FINCHAIN_DOMAIN,
        SERVICES: (FINCHAIN_DOMAIN + "/services")
      }
    };
  };

  exports.decipherObj = decipherObj;
  exports.cipherObj = cipherObj;
  exports.getDomains = getDomains;
  exports.getProjectPath = getProjectPath;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

const SimpleCrypto = require('simple-crypto-js').default;
const OBJ_TO_DECIPHER = require('../output/CIPHERED.json');
// const OBJ_TO_DECIPHER = {};

const ITERATION = 5;
const encrypt = (input, cryptoObj) => cryptoObj.encrypt(input);

const decrypt = (input, cryptoObj) => cryptoObj.decrypt(input);

const traverse = (cryptoObj, raw, isEncryption = true, result = {}) => {
  for (const key in raw) {
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

export const decipherObj = (obj, secret) => {
  const simpleCrypto = new SimpleCrypto(secret);
  simpleCrypto._iterations = ITERATION;

  return traverse(simpleCrypto, obj, false);
};

export const cipherObj = (obj, secret) => {
  const simpleCrypto = new SimpleCrypto(secret);
  simpleCrypto._iterations = ITERATION;

  return traverse(simpleCrypto, obj, true);
};

export const getDomains = secret => decipherObj(OBJ_TO_DECIPHER, secret);

export const getProjectPath = (secret, env = 'TEST') => {
  const DOMAIN = getDomains(secret);

  const SECOND_LEVEL_DOMAIN = DOMAIN[env].SECOND_LEVEL_DOMAIN;
  const THIRD_LEVEL_DOMAIN = DOMAIN[env].THIRD_LEVEL_DOMAIN;

  const DOMAIN_SUFFIX = `${THIRD_LEVEL_DOMAIN}.${SECOND_LEVEL_DOMAIN}`;

  const KCHAIN_DOMAIN = `//${DOMAIN_SUFFIX}`;
  const EXPLORER_DOMAIN = `//explorer.${DOMAIN_SUFFIX}`;
  const FINCHAIN_DOMAIN = `//finchain.${DOMAIN_SUFFIX}`;
  const NCC_DOMAIN = `//ncc.${DOMAIN_SUFFIX}`;
  const ICHAIN_DOMAIN = `//ichain.${DOMAIN_SUFFIX}`;

  return {
    DOMAIN_SUFFIX,
    KCHAIN_DOMAIN,
    EXPLORER_DOMAIN,
    FINCHAIN_DOMAIN,
    NCC_DOMAIN,
    ICHAIN_DOMAIN,
    KCHAIN: {
      INDEX: `${KCHAIN_DOMAIN}`,
      EXPERIENCE: `${KCHAIN_DOMAIN}/experience`
    },
    ICHAIN: {
      INDEX: `${ICHAIN_DOMAIN}`
    },
    EXPLORER: {
      INDEX: EXPLORER_DOMAIN,
      SEARCH: `${EXPLORER_DOMAIN}/#/search/`
    },
    NCC: {
      INDEX: NCC_DOMAIN,
      VIP: `${NCC_DOMAIN}/vip`
    },
    FINCHAIN: {
      INDEX: FINCHAIN_DOMAIN,
      SERVICES: `${FINCHAIN_DOMAIN}/services`
    }
  };
};

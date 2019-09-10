module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["google"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "require-jsdoc": "off",
    "linebreak-style": 0
  }
};

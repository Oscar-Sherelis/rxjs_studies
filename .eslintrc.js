module.exports = {
  env: {
    browser: true,
    es6: true,
    amd: true,
    node: true,
    commonjs: true,
    jquery: true
  },
  parser: "babel-eslint",
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": 1,
    "no-debugger": 2,
    "space-before-blocks": 2,
    "no-var": 2
  }
};

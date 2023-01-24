module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};

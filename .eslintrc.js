module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "jest": true,
  },
  "rules": {
    "no-shadow": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "comma-dangle": "off",
    "semi": ["error", "never"],
    "jsx-quotes": ["error", "prefer-single"],
    "import/no-extraneous-dependencies": [ "error", { "packageDir": "./" } ],
    "prefer-destructuring": "off",
    "no-unused-vars": ["error", { "args": "none" }],
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-console": "off",
    "react/static-property-placement": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
    "react/jsx-fragments": ["error", "element"],
    "react/jsx-curly-newline": "off"
  },
  "globals": {
    "fetch": false,
    "FormData": true,
    "FileReader": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
    "rules": {
        }
    }
}
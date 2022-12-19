const withLess = require("next-with-less");
const { NEXT_PUBLIC_CSS_APP_PREFIX } = process.env;
module.exports = [
  [
    withLess,
    {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            "@app-prefix": NEXT_PUBLIC_CSS_APP_PREFIX,
            "@ant-prefix": NEXT_PUBLIC_CSS_APP_PREFIX,
          },
        },
      },
    },
  ],
];

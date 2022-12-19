const rewritesConfig = require("./rewrites/index");
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return rewritesConfig;
  },
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Account',
    createProxyMiddleware({
      target: `REACT_APP_URL`,
      changeOrigin: true,
    })
  );
  app.use(
    '/Territories',
    createProxyMiddleware({
      target: `REACT_APP_URL`,
      changeOrigin: true,
    })
  );
};

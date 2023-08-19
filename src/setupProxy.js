const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Account',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    })
  );
  app.use(
    '/Territories',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    })
  );
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Change this path to match your API endpoints
    createProxyMiddleware({
      target: 'https://netzwelt-devtest.azurewebsites.net',
      changeOrigin: true,
    })
  );
};

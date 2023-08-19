// const { createProxyMiddleware } = require('http-proxy-middleware');


// const rootUrl = process.env.NODE_ENV === 'production' ? 
//   'https://netzwelt-devtest.azurewebsites.net' : ''

// module.exports = function(app) {
//   app.use(
//     '/Account',
//     createProxyMiddleware({
//       target: `${rootUrl}`,
//       changeOrigin: true,
//     })
//   );
//   app.use(
//     '/Territories',
//     createProxyMiddleware({
//       target: `${rootUrl}`,
//       changeOrigin: true,
//     })
//   );
// };

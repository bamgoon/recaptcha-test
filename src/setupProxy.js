const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    createProxyMiddleware('/recaptcha', {
      target: 'https://www.google.com',
      changeOrigin: true,
    }),
  );
};

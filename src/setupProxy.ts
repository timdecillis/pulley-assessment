const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: any) {
  app.use(
    '/api', // Match the API route
    createProxyMiddleware({
      target: 'https://ciphersprint.pulley.com', // Target server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the /api prefix when forwarding
      },
    })
  );
};
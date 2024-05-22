const bypassFn = function (req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET, POST, HEAD, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.send('');
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
  }
};

const PROXY_CONFIG = {
  '/portal-api': {
    target: 'http://tkit-portal-server/',
    secure: false,
    pathRewrite: {
      '^.*/portal-api': '',
    },
    changeOrigin: true,
    logLevel: 'debug',
    bypass: bypassFn,
  },
  '/bff': {
    target: 'http://localhost:8080',
    secure: false,
    pathRewrite: {
      '^.*/bff': 'internal',
    },
    changeOrigin: true,
    logLevel: 'debug',
    bypass: bypassFn,
  },
};

module.exports = PROXY_CONFIG;

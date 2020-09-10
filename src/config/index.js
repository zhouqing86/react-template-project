const appEnv = process.env.REACT_APP_ENV || 'default';

const defaultConfig = require('./config.default');

const config = require(`./config.${appEnv}`);

export default { ...defaultConfig, ...config };

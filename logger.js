const pino = require('pino');

let commonLoggerDest = null;

module.exports = (name, loggerDest = null) => {
  let pinoDestination = undefined;
  if (loggerDest) {
    pinoDestination = pino.destination(loggerDest);
  } else if (commonLoggerDest) {
    pinoDestination = pino.destination(commonLoggerDest);
  }
  return pino({
    name,
    prettyPrint: {
      translateTime: 'SYS:standard',
    },
    ...(pinoDestination ? {
      prettyPrint: false,
    } : {}),
  }, pinoDestination);
};

module.exports.init = (config = {}) => {
  const {
    dest = null,
  } = config;
  commonLoggerDest = dest;
};

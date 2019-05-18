const _ = require('lodash');
const moment = require('moment');
const pino = require('pino');

module.exports = (name) => pino({
  name,
  prettyPrint: {
    translateTime: 'SYS:standard',
  },
});
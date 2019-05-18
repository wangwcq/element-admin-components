const _ = require('lodash');
const d3dsv = require('d3-dsv');
const fs = require('fs');
const paths = require('path');
const logger = require('../logger')('i18n generator');

async function doConvert(inputDir) {
  const csvStr = fs.readFileSync(paths.resolve(inputDir, 'i18n.csv'), 'utf8');

  const csvMap = d3dsv.csvParse(csvStr);

  const langs = _.filter(csvMap.columns, x => x !== 'key');

  const ret = {};
  _.forEach(langs, x => { ret[x] = {}; });

  function fillValue(obj, key, value) {
    const keySplitted = key.split('.');
    if (keySplitted.length > 1) {
      if (!obj[_.first(keySplitted)]) {
        obj[_.first(keySplitted)] = {};
      }
      fillValue(obj[_.first(keySplitted)], _.slice(keySplitted, 1).join('.'), value);
      return;
    }
    obj[key] = value;
  }

  _.forEach(csvMap, x => {
    if (!x.key) { return true; }
    _.forEach(langs, lang => {
      fillValue(ret[lang], x.key, x[lang]);
    });
    return true;
  });

  _.forEach(langs, x => {
    const dir = paths.resolve(inputDir, `${x}.json`);
    fs.writeFileSync(dir, JSON.stringify(ret[x], null, 2));
    logger.info(dir);
  });

}

doConvert(paths.resolve('./langs'));
doConvert(paths.resolve('./dev/langs'));

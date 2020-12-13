import yaml from 'js-yaml';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, dataFormatName) => parse[dataFormatName](data);

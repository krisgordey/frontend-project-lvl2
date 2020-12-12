import yaml from 'js-yaml';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, ext) => parse[ext](data);

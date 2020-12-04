import yaml from 'js-yaml';

const parsersFactory = (format) => {
  let parse;
  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.safeLoad;
  }

  return parse;
};

export default (data, format) => parsersFactory(format)(data);

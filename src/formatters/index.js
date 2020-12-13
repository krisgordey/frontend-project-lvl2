import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (diff, formatName) => {
  const formatters = {
    plain,
    stylish,
    json,
  };

  return formatters[formatName](diff);
};

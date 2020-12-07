import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (diffAST, formatName) => {
  const formatters = {
    plain,
    stylish,
    json,
  };

  return `${formatters[formatName](diffAST)}\n`;
};

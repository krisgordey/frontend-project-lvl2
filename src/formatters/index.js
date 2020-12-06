import plain from './plain.js';
import stylish from './stylish.js';

export default (diffAST, formatName) => {
  const formatters = {
    plain,
    stylish,
  };

  return formatters[formatName](diffAST);
};

import _ from 'lodash';
import Types from '../utils/constants.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

export default (diff) => {
  const iter = (nodes, accPath) => {
    const stringsList = nodes.map((node) => {
      const path = `${accPath}${node.key}`;

      switch (node.type) {
        case Types.NESTED:
          return iter(node.children, `${path}.`);
        case Types.UNCHANGED:
          return null;
        case Types.CHANGED:
          return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case Types.ADDED:
          return `Property '${path}' was added with value: ${formatValue(node.value)}`;
        case Types.DELETED:
          return `Property '${path}' was removed`;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    }).filter((it) => it);

    return stringsList.join('\n');
  };

  return iter(diff, '');
};

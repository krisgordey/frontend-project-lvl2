import _ from 'lodash';
import { Statuses } from '../utils/constants.js';

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

      switch (node.status) {
        case Statuses.NESTED:
          return iter(node.children, `${path}.`);
        case Statuses.UNCHANGED:
          return null;
        case Statuses.CHANGED:
          return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case Statuses.ADDED:
          return `Property '${path}' was added with value: ${formatValue(node.value)}`;
        case Statuses.DELETED:
          return `Property '${path}' was removed`;
        default:
          throw new Error(`Unknown status: ${node.status}`);
      }
    }).filter((it) => it);

    return stringsList.join('\n');
  };

  return iter(diff, '');
};

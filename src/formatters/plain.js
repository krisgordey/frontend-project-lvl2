import _ from 'lodash';
import { Statuses } from '../utils/constants.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return value;
};

const getFlattenAST = (diffAST, path = '') => {
  const result = diffAST.flatMap(({
    key, status, nested, oldVal, newVal,
  }) => {
    const accPath = `${path}${key}`;

    switch (status) {
      case Statuses.UNCHANGED:
        return { key: accPath, status };
      case Statuses.CHANGED:
        return {
          key: accPath, status, oldVal, newVal,
        };
      case Statuses.ADDED:
        return { key: accPath, status, newVal };
      case Statuses.DELETED:
        return { key: accPath, status };
      case Statuses.NESTED:
        return getFlattenAST(nested, `${accPath}.`);
      default:
        throw new Error('Unexpected AST node status type');
    }
  });

  return result;
};

export default (diffAST) => {
  const flattenAST = getFlattenAST(diffAST);

  const stringsList = flattenAST.map(({
    key, status, oldVal, newVal,
  }) => {
    switch (status) {
      case Statuses.UNCHANGED:
        return null;
      case Statuses.CHANGED:
        return `Property '${key}' was updated. From ${formatValue(oldVal)} to ${formatValue(newVal)}`;
      case Statuses.ADDED:
        return `Property '${key}' was added with value: ${formatValue(newVal)}`;
      case Statuses.DELETED:
        return `Property '${key}' was removed`;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }).filter((it) => Boolean(it));
  return `${stringsList.join('\n')}\n`;
};

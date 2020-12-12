import _ from 'lodash';
import { Statuses } from '../utils/constants.js';

const Marker = {
  MINUS: '-',
  PLUS: '+',
  EMPTY: ' ',
};

const getIndent = (count) => '  '.repeat(count);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const arr = Object.entries(value).reduce(
    (acc, [key, val]) => [...acc, `${getIndent(depth + 4)}${key}: ${formatValue(val, depth + 2)}`],
    [],
  );

  return `{\n${arr.join('\n')}\n${getIndent(depth + 2)}}`;
};

const format = (diff, depth) => {
  const stringsList = diff.flatMap((node) => {
    switch (node.status) {
      case Statuses.UNCHANGED:
        return `${getIndent(depth + 1)}${Marker.EMPTY} ${node.key}: ${formatValue(node.newValue, depth)}`;
      case Statuses.CHANGED:
        return [
          `${getIndent(depth + 1)}${Marker.MINUS} ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${getIndent(depth + 1)}${Marker.PLUS} ${node.key}: ${formatValue(node.newValue, depth)}`,
        ];
      case Statuses.ADDED:
        return `${getIndent(depth + 1)}${Marker.PLUS} ${node.key}: ${formatValue(node.newValue, depth)}`;
      case Statuses.DELETED:
        return `${getIndent(depth + 1)}${Marker.MINUS} ${node.key}: ${formatValue(node.oldValue, depth)}`;
      case Statuses.NESTED:
        return `${getIndent(depth + 1)}${Marker.EMPTY} ${node.key}: {\n${format(node.children, depth + 2)}\n${getIndent(depth + 2)}}`;
      default:
        throw new Error('Unexpected node status type');
    }
  });

  return stringsList.join('\n');
};

export default (diff) => `{\n${format(diff, 0)}\n}`;

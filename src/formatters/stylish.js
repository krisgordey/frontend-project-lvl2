import _ from 'lodash';
import { Statuses } from '../utils/constants.js';

const Marker = {
  MINUS: '-',
  PLUS: '+',
  EMPTY: ' ',
};

const baseIndent = 4;
const firstIndent = 2;
const getIndent = (depth) => (' ').repeat(firstIndent + baseIndent * depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const nestedDepth = depth + 1;
  const formattedValues = Object
    .entries(value)
    .map(([key, nodeValue]) => `${getIndent(nestedDepth)}  ${key}: ${stringify(nodeValue, nestedDepth)}`);
  return `{\n${formattedValues.join('\n')}\n${getIndent(depth)}  }`;
};

const format = (diffTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.status) {
      case Statuses.NESTED:
        return `${getIndent(depth)}${Marker.EMPTY} ${node.key}: {\n${iter(node.children, depth + 1)}\n${getIndent(depth)}  }`;
      case Statuses.ADDED:
        return `${getIndent(depth)}${Marker.PLUS} ${node.key}: ${stringify(node.value, depth)}`;
      case Statuses.DELETED:
        return `${getIndent(depth)}${Marker.MINUS} ${node.key}: ${stringify(node.value, depth)}`;
      case Statuses.CHANGED:
        return `${getIndent(depth)}${Marker.MINUS} ${node.key}: ${stringify(node.oldValue, depth)}\n${getIndent(depth)}${Marker.PLUS} ${node.key}: ${stringify(node.newValue, depth)}`;
      case Statuses.UNCHANGED:
        return `${getIndent(depth)}${Marker.EMPTY} ${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`unexpected node status: ${node.status}`);
    }
  }).join('\n');
  return `{\n${iter(diffTree, 0)}\n}`;
};

export default format;

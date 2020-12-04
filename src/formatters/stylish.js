import _ from 'lodash';
import { Statuses } from '../utils/constants.js';

const Marker = {
  MINUS: '-',
  PLUS: '+',
  EMPTY: ' ',
};

const getTabs = (count) => '  '.repeat(count);

const formatValue = (value, tabsCount) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const arr = Object.entries(value).reduce(
    (acc, [key, val]) => [...acc, `${getTabs(tabsCount + 4)}${key}: ${formatValue(val, tabsCount + 2)}`],
    [],
  );

  return `{\n${arr.join('\n')}\n${getTabs(tabsCount + 2)}}`;
};

const format = (diffAST, tabsCount) => {
  const stringsList = diffAST.flatMap(({
    key, status, oldVal, newVal, nested,
  }) => {
    if (status === Statuses.UNCHANGED) {
      return `${getTabs(tabsCount + 1)}${Marker.EMPTY} ${key}: ${formatValue(newVal, tabsCount)}`;
    } if (status === Statuses.CHANGED) {
      return [
        `${getTabs(tabsCount + 1)}${Marker.MINUS} ${key}: ${formatValue(oldVal, tabsCount)}`,
        `${getTabs(tabsCount + 1)}${Marker.PLUS} ${key}: ${formatValue(newVal, tabsCount)}`,
      ];
    } if (status === Statuses.ADDED) {
      return `${getTabs(tabsCount + 1)}${Marker.PLUS} ${key}: ${formatValue(newVal, tabsCount)}`;
    } if (status === Statuses.DELETED) {
      return `${getTabs(tabsCount + 1)}${Marker.MINUS} ${key}: ${formatValue(oldVal, tabsCount)}`;
    } if (status === Statuses.NESTED) {
      return `${getTabs(tabsCount + 1)}${Marker.EMPTY} ${key}: {\n${format(nested, tabsCount + 2)}\n${getTabs(tabsCount + 2)}}`;
    }
    throw new Error('unexpected AST node status type');
  });

  return stringsList.join('\n');
};

export default (diffAST) => `{\n${format(diffAST, 0)}\n}\n`;
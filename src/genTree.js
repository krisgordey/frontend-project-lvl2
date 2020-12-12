import _ from 'lodash';
import { Statuses } from './utils/constants.js';

const genTree = (data1, data2) => {
  const unionSortedKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const tree = unionSortedKeys.map((key) => {
    if (data1[key] === data2[key]) {
      return {
        key,
        status: Statuses.UNCHANGED,
        newValue: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: Statuses.ADDED,
        newValue: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        status: Statuses.DELETED,
        oldValue: data1[key],
      };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        status: Statuses.NESTED,
        children: genTree(data1[key], data2[key]),
      };
    }
    return {
      key,
      status: Statuses.CHANGED,
      oldValue: data1[key],
      newValue: data2[key],
    };
  });

  return tree;
};

export default genTree;

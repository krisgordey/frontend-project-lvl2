import _ from 'lodash';
import Types from './utils/constants.js';

const genTree = (data1, data2) => {
  const unionSortedKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const tree = unionSortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        type: Types.ADDED,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: Types.DELETED,
        value: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        key,
        type: Types.UNCHANGED,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: Types.NESTED,
        children: genTree(data1[key], data2[key]),
      };
    }
    return {
      key,
      type: Types.CHANGED,
      oldValue: data1[key],
      newValue: data2[key],
    };
  });

  return tree;
};

export default genTree;

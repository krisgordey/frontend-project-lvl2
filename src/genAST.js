import _ from 'lodash';
import { Statuses } from './utils/constants.js';

const genAST = (data1, data2) => {
  const unionSortedKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const AST = unionSortedKeys.map((key) => {
    const meta = {
      key,
    };

    if (data1[key] === data2[key]) {
      meta.status = Statuses.UNCHANGED;
    } else if (!_.has(data1, key)) {
      meta.status = Statuses.ADDED;
    } else if (!_.has(data2, key)) {
      meta.status = Statuses.DELETED;
    } else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      meta.status = Statuses.NESTED;
      meta.nested = genAST(data1[key], data2[key]);
    } else if (data1[key] !== data2[key]) {
      meta.status = Statuses.CHANGED;
    }

    if (_.has(data1, key)) {
      meta.oldVal = data1[key];
    }

    if (_.has(data2, key)) {
      meta.newVal = data2[key];
    }

    return meta;
  });
  return AST;
};

export default genAST;

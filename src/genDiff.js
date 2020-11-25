import _ from 'lodash';
import { Statuses } from './utils/contants.js';

const genDiff = (data1, data2) => {
  const unionKeys = _.union(Object.keys(data1), Object.keys(data2));
  const SortedByAlphabet = unionKeys.sort();

  const diff = SortedByAlphabet.map((key) => {
    const meta = {
      key,
    };

    if (data1[key] === data2[key]) {
      meta.status = Statuses.UNCHANGED;
    } else if (data1[key] !== data2[key]) {
      meta.status = Statuses.CHANGED;
    } else if (!data1[key]) {
      meta.status = Statuses.ADDED;
    } else if (!data2[key]) {
      meta.status = Statuses.DELETED;
    }

    if (data1[key]) {
      meta.oldVal = data1[key];
    }

    if (data2[key]) {
      meta.newVal = data2[key];
    }

    return meta;
  });

  console.log(data1);
  console.log(data2);
  console.log(diff);

  return diff;
};

export default genDiff;

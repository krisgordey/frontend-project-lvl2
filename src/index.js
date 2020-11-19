import { readFile } from './utils/index.js';
import _ from 'lodash';

const Statuses = {
  ADDED: 'ADDED',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
  DELETED: 'deleted',
}

const offsetMap = {
  minus: ' - ',
  plus: ' + ',
  empty: '   ',
}

const getTabs = (count) => ' '.repeat(count);


const genDiff = (path1, path2, cmdObj) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const unionKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const SortedByAlphabet = unionKeys.sort();

  const diffMeta = SortedByAlphabet.map(key => {
    const meta = {
      key: key,
    }

    if ((obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) && obj1[key] === obj2[key]) {
      meta.status = Statuses.UNCHANGED
    } else if ((obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) && obj1[key] !== obj2[key]) {
      meta.status = Statuses.CHANGED
    } else if (!obj1.hasOwnProperty(key)) {
      meta.status = Statuses.ADDED
    } else if (!obj2.hasOwnProperty(key)) {
      meta.status = Statuses.DELETED
    }

    if (obj1.hasOwnProperty(key)) {
      meta.oldVal = obj1[key];
    }

    if (obj2.hasOwnProperty(key)) {
      meta.newVal = obj2[key];
    }

    return meta;
  })

  const diffStrings = diffMeta.reduce((acc, item) => {
    if (item.status === Statuses.UNCHANGED) {
      acc.push(`${getTabs(1)}${offsetMap.empty}${item.key}: ${item.newVal}\n`);
      return acc;
    } else if (item.status === Statuses.CHANGED) {
      acc.push(`${getTabs(1)}${offsetMap.minus}${item.key}: ${item.oldVal}\n`);
      acc.push(`${getTabs(1)}${offsetMap.plus}${item.key}: ${item.newVal}\n`);
      return acc;
    } else if (item.status === Statuses.ADDED) {
      acc.push(`${getTabs(1)}${offsetMap.plus}${item.key}: ${item.newVal}\n`);
      return acc;
    } else if (item.status === Statuses.DELETED) {
      acc.push(`${getTabs(1)}${offsetMap.minus}${item.key}: ${item.oldVal}\n`);
      return acc;
    }
  }, []);

  const outputString = `{\n${diffStrings.join('')}}`


   console.log(outputString);
};

export default genDiff;

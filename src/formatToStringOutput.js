import { Statuses } from './utils/contants.js';

const offsetMap = {
  minus: ' - ',
  plus: ' + ',
  empty: '   ',
};

const getTabs = (count) => ' '.repeat(count);

export default (diff) => {
  const diffStrings = diff.reduce((acc, item) => {
    if (item.status === Statuses.UNCHANGED) {
      acc.push(`${getTabs(1)}${offsetMap.empty}${item.key}: ${item.newVal}\n`);
      return acc;
    } if (item.status === Statuses.CHANGED) {
      acc.push(`${getTabs(1)}${offsetMap.minus}${item.key}: ${item.oldVal}\n`);
      acc.push(`${getTabs(1)}${offsetMap.plus}${item.key}: ${item.newVal}\n`);
      return acc;
    } if (item.status === Statuses.ADDED) {
      acc.push(`${getTabs(1)}${offsetMap.plus}${item.key}: ${item.newVal}\n`);
      return acc;
    } if (item.status === Statuses.DELETED) {
      acc.push(`${getTabs(1)}${offsetMap.minus}${item.key}: ${item.oldVal}\n`);
      return acc;
    }

    throw new Error('unexpected status type');
  }, []);

  const outputString = `{\n${diffStrings.join('')}}`;

  return outputString;
};

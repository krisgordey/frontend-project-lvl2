import { expect } from '@jest/globals';
import readFile from '../src/utils/readFile.js';
import genDiff from '../src/genDiff';

const readFixtureFile = (filename) => readFile(`__fixtures__/${filename}`);

test('genDiff plain json', async () => {
  const file1Content = await readFixtureFile('file1plain.json');
  const file2Content = await readFixtureFile('file2plain.json');

  const file1Obj = JSON.parse(file1Content);
  const file2Obj = JSON.parse(file2Content);

  const diff = genDiff(file1Obj, file2Obj);

  expect(diff).toEqual([
    { key: 'follow', status: 'changed' },
    {
      key: 'host',
      status: 'unchanged',
      oldVal: 'hexlet.io',
      newVal: 'hexlet.io',
    },
    { key: 'proxy', status: 'changed', oldVal: '123.234.53.22' },
    {
      key: 'timeout', status: 'changed', oldVal: 50, newVal: 20,
    },
    { key: 'verbose', status: 'changed', newVal: true },
  ]);
});

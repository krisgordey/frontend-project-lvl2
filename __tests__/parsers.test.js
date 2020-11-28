import path from 'path';
import { describe, expect } from '@jest/globals';
import parsers from '../src/utils/parsers';
import readFile from '../src/utils/readFile';

const readFixtureFile = (filename) => readFile(`__fixtures__/${filename}`);
describe('parsers test', () => {
  test('json', async () => {
    const fileContent = await readFixtureFile('file1plain.json');
    const fileExt = path.extname('file1plain.json');

    const result = parsers(fileContent, fileExt);

    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });

  test('yaml', async () => {
    const fileContent = await readFixtureFile('file1plain.yml');
    const fileExt = path.extname('file1plain.yml');

    const result = parsers(fileContent, fileExt);

    expect(result).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });
});

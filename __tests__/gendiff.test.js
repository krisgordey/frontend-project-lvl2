import { describe, expect } from '@jest/globals';

import path from 'path';
import readFile from '../src/utils/readFile.js';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.resolve(process.cwd(), `__fixtures__/${filename}`);
const readFixtureFile = (filename) => readFile(`__fixtures__/${filename}`);

describe('Test gendiff for stylish', () => {
  test.each([
    ['json', 'json'],
    ['yml', 'json'],
    ['json', 'yml'],
    ['yml', 'yml'],
  ])('gendiff(%s, %s)', async (file1ext, file2ext) => {
    const file1path = getFixturePath(`file1.${file1ext}`);
    const file2path = getFixturePath(`file2.${file2ext}`);
    const expected = await readFixtureFile('result-stylish.txt');

    expect(gendiff(file1path, file2path, 'stylish')).toEqual(expected);
  });
});

describe('Test gendiff for plain', () => {
  test.each([
    ['json', 'json'],
    ['yml', 'json'],
    ['json', 'yml'],
    ['yml', 'yml'],
  ])('gendiff(%s, %s)', async (file1ext, file2ext) => {
    const file1path = getFixturePath(`file1.${file1ext}`);
    const file2path = getFixturePath(`file2.${file2ext}`);
    const expected = await readFixtureFile('result-plain.txt');

    expect(gendiff(file1path, file2path, 'plain')).toEqual(expected);
  });
});

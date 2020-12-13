import { describe, expect } from '@jest/globals';

import path from 'path';
import fs from 'fs';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.resolve(process.cwd(), `__fixtures__/${filename}`);

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(fullPath, 'utf8');
};

const readFixtureFile = (filename) => readFile(`__fixtures__/${filename}`).trim();

const stylishResult = readFixtureFile('result-stylish.txt');
const plainResult = readFixtureFile('result-plain.txt');
const jsonResult = readFixtureFile('result-json.txt');

describe('Test gendiff', () => {
  test.each([
    ['yml', 'json'],
    ['json', 'yml'],
  ])('gendiff(%s, %s)', (file1ext, file2ext) => {
    const filepath1 = getFixturePath(`file1.${file1ext}`);
    const filepath2 = getFixturePath(`file2.${file2ext}`);
    // const stylishResult = readFixtureFile('result-stylish.txt');
    // const plainResult = readFixtureFile('result-plain.txt');
    // const jsonResult = readFixtureFile('result-json.txt');

    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});

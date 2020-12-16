import { describe, expect } from '@jest/globals';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const readFixtureFile = (filename) => readFile(filename).trim();

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

    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});

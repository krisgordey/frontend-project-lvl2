import path from 'path';
import readFile from './utils/readFile.js';
import parsers from './parsers.js';

import genTree from './genTree.js';
import format from './formatters/index.js';

// eslint-disable-next-line
export default (path1, path2, formatName = 'stylish') => {
  const file1Content = readFile(path1);
  const file2Content = readFile(path2);

  const extFile1 = path.extname(path1).slice(1);
  const extFile2 = path.extname(path2).slice(1);

  const parsedData1 = parsers(file1Content, extFile1);
  const parsedData2 = parsers(file2Content, extFile2);

  const diff = genTree(parsedData1, parsedData2);

  const formattedOutput = format(diff, formatName);

  return formattedOutput;
};

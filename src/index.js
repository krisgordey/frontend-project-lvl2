import path from 'path';
import readFile from './utils/readFile.js';
import parser from './parser.js';

import genTree from './genTree.js';
import format from './formatters/index.js';

export default (path1, path2, formatName = 'stylish') => {
  const file1Content = readFile(path1);
  const file2Content = readFile(path2);

  const dataFormatName1 = path.extname(path1).slice(1);
  const dataFormatName2 = path.extname(path2).slice(1);

  const parsedData1 = parser(file1Content, dataFormatName1);
  const parsedData2 = parser(file2Content, dataFormatName2);

  const diff = genTree(parsedData1, parsedData2);

  const formattedOutput = format(diff, formatName);

  return formattedOutput;
};

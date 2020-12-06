import path from 'path';
import readFile from './utils/readFile.js';
import parsers from './parsers.js';

import genAST from './genAST.js';
import format from './formatters/index.js';

// eslint-disable-next-line
export default (path1, path2, formatName = 'stylish') => {
  const file1Content = readFile(path1);
  const file2Content = readFile(path2);

  const extFile1 = path.extname(path1);
  const extFile2 = path.extname(path2);

  const parsedData1 = parsers(file1Content, extFile1);
  const parsedData2 = parsers(file2Content, extFile2);

  const diffAST = genAST(parsedData1, parsedData2);

  const formattedOutput = format(diffAST, formatName);

  return formattedOutput;
};

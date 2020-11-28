import path from 'path';
import readFile from './utils/readFile.js';
import parsers from './utils/parsers.js';

import genDiff from './genDiff.js';
import formatToStringOutput from './formatToStringOutput.js';

// eslint-disable-next-line
export default (path1, path2, cmdObj) => {
  const file1Content = readFile(path1);
  const file2Content = readFile(path2);

  const extFile1 = path.extname(path1);
  const extFile2 = path.extname(path2);

  const data1 = parsers(file1Content, extFile1);
  const data2 = parsers(file2Content, extFile2);

  const diff = genDiff(data1, data2);

  const formattedOutput = formatToStringOutput(diff);

  console.log(formattedOutput);
};

import readFile from './utils/readFile.js';

import genDiff from './genDiff.js';
import formatToStringOutput from './formatToStringOutput.js';

// eslint-disable-next-line
export default (path1, path2, cmdObj) => {
  const file1Content = readFile(path1);
  const file2Content = readFile(path2);

  const data1 = JSON.parse(file1Content);
  const data2 = JSON.parse(file2Content);

  const diff = genDiff(data1, data2);

  const formattedOutput = formatToStringOutput(diff);

  console.log(formattedOutput);
};

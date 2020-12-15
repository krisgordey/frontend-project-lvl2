import fs from 'fs';
import path from 'path';
import parser from './parser.js';

import genTree from './genTree.js';
import format from './formatters/index.js';

const getDataFormat = (filepath) => path.extname(filepath).slice(1);
const getContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath));

export default (path1, path2, formatName = 'stylish') => {
  const parsedContentOfFile1 = parser(getContent(path1), getDataFormat(path1));
  const parsedContentOfFile2 = parser(getContent(path2), getDataFormat(path2));

  const diff = genTree(parsedContentOfFile1, parsedContentOfFile2);

  const formattedOutput = format(diff, formatName);

  return formattedOutput;
};

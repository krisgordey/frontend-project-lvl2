import fs from 'fs';
import getFilePath from './getFilePath.js';

export default (filePath) => {
  const fullPath = getFilePath(filePath);
  const data = fs.readFileSync(fullPath).toString();

  return data;
};

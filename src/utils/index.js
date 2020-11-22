import fs from 'fs';
import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath).toString();

  return data;
};

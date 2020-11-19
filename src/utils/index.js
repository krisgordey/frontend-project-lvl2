import fs from 'fs';
import path from 'path';

export const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath).toString();

  return data;
}

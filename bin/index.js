#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';

import genDiff from '../src/index.js';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const program = new commander.Command();

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2, programObj) => console.log(genDiff(path1, path2, programObj.format)))
  .parse(process.argv);

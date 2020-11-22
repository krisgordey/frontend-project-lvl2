#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';

import genDiff from '../src/index.js';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const program = new commander.Command();

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(genDiff);

program.parse(process.argv);

if (program.format) console.log(`- ${program.format}`);

#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const program = new commander.Command();

program.version(version)

program.parse(process.argv);

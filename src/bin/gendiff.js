#!/usr/bin/env node
import program from 'commander';

program
  .version('2.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);

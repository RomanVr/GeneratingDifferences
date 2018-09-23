#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';

program
  .version('1.3.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --formate [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  });

program.parse(process.argv);

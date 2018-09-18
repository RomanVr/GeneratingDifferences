#!/usr/bin/env node
import program from 'commander';
import gendiff from '../gendiffFunction';

program
  .version('1.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --formate [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  });

program.parse(process.argv);

export default gendiff;

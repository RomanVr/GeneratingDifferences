#!/usr/bin/env node
import program from 'commander';

program
  .version('1.0.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --formate [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    if (firstConfig === undefined || secondConfig === undefined) {
      console.error('no command given!');
    }
  });

program.parse(process.argv);

console.log('Hello!');

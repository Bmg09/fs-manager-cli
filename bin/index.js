#!/usr/bin/env node

const { program } = require('commander');
const { fetchJoke } = require('../src/joke');
const { printDirectoryTree } = require('../src/tree');
const { createDirectoryTreeJSON } = require('../src/backup');
const { categorizeAndMoveFiles } = require('../src/restructFolderStructure');
const chalk = require('chalk')

program
  .version('1.0.0')
  .description('A command-line tool for printing directory trees, creating JSON directory backups');


program
  .command('view-tree')
  .description('Prints a tree of the current directory')
  .option('-p, --path <path>', 'Add a path')
  .option('-e, --excludeFolder <excludeFolder>', 'Add a folder name which you don\'t want to print in the tree')
  .action((cmd) => {
    if(cmd.path === undefined || cmd.path === null || cmd.path === '') {
        cmd.path = process.cwd()
    }
    printDirectoryTree(cmd.path, '', cmd.excludeFolder);
});

program
  .command('backup')
  .description('Creates a JSON backup of the [current|path] directory')
  .option('-p, --path <path>', 'Add a path')
  .option('-e, --excludeFolder <excludeFolder>', 'Add a folder name which you don\'t want to add in the backup')
  .action((cmd) => {
    if(cmd.path === undefined || cmd.path === null || cmd.path === '') {
        cmd.path = process.cwd()
    }
    createDirectoryTreeJSON(cmd.path, cmd.excludeFolder);
  });

program
  .command('restructure')
  .description(`${chalk.yellow('Warning: Use with caution can alter system files.')} \nRestructure the [current|path] directory`)
  .option('-p, --path <path>', 'Add a path')
  .option('-e, --excludeFolder <excludeFolder>', 'Add a folder name which you don\'t want to restructure')
  .option('-ext, --extension <extension>', 'Add a extensions which you want to restructure sample input: -ext jpg,png,pdf')
  .action((cmd) => {
    
    if(cmd.path === undefined || cmd.path === null || cmd.path === '') {
        console.log(chalk.red('No argument passed.'));
        return;
    }
    categorizeAndMoveFiles(cmd.path, cmd.excludeFolder, cmd.extension.split(','));
    
  });

program
  .command('joke')
  .description('Fetch a joke')
  .option('-n, --name <name>', 'Your name')
  .option('-s, --search <search>', 'Search term')
  .action((cmd) => {
    if(cmd.name === undefined || cmd.name === null || cmd.name === '') {
        cmd.name = 'Stranger'
    }
    fetchJoke(cmd.name, cmd.search);
  });



program.parse(process.argv);

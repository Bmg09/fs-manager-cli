#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const { fetchJoke } = require('../src/joke');
const { printDirectoryTree } = require('../src/tree');

program
  .version('1.0.0')
  .description('A command-line tool for fetching jokes and printing directory trees');


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

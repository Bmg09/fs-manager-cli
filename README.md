# FS-Manager-CLI

## Description

`fs-manager-cli` is a command-line tool built to printing directory trees directly from your terminal, take a JSON dump of Directory tree, Re-arrange files using MIME-TYPE of given type through terminal and Fetch random Jokes.

## Features

- JSON dump of Directory tree
- View the directory tree of any given path
- Re-arrange files using MIME-TYPE
- Fetch random Jokes

## Installation

To install `fs-manager-cli`, run:

```bash
npm install -g fs-manager-cli
```

## Usage

### View Directory Tree

To print a tree of the current directory:

```bash
fs-manager-cli view-tree
```

#### Options

- `-p, --path <path>`: Specify a path to view its directory tree.
- `-e, --excludeFolder <excludeFolder>`: Exclude a specific folder from the tree.

### Create a JSON dump of directory tree

Creates a JSON backup of the [current|path] directory:

```bash
fs-manager-cli backup
```

#### Options

- `-p, --path <path>`: Specify a path to view its directory tree.
- `-e, --excludeFolder <excludeFolder>`: Exclude a specific folder from the tree.

### Restructure files using MIME-TYPE

Restructures files using MIME-TYPE of given type:

```bash
fs-manager-cli restructure
```

#### Options

- `-p, --path <path>`: Add a path
- `-e, --excludeFolder <excludeFolder>`:Add a folder name which you don't want to restructure
- `-ext, --extension <extension>`:  Add a extensions which you want to restructure

### Fetch a Joke

To fetch a random joke:

```bash
fs-manager-cli joke
```

#### Options

- `-n, --name <name>`: Your name to personalize the joke.
- `-s, --search <search>`: Search term to fetch a specific joke.

## Examples

### View Tree of Current Directory

```bash
fs-manager-cli view-tree
```

### View Tree of Specified Path

```bash
fs-manager-cli view-tree -p /usr/local
```

### Create a Backup

```bash
fs-manager-cli backup
```

### Create a Backup of Specified Path

```bash
fs-manager-cli backup -p /usr/local
```

### Restructure Files

```bash
fs-manager-cli restructure -p /usr/local -ext jpg,png -e node_modules 
```

### Fetch a Joke for John

```bash
fs-manager-cli joke -n John
```

### Fetch a Joke About Cats

```bash
fs-manager-cli joke -s cats
```

## License

MIT

---

Feel free to contribute and raise issues. Enjoy using `fs-manager-cli`!

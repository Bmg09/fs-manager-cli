# FS-Manager-CLI

## Description

`fs-manager-cli` is a command-line tool built to make your life easier by fetching jokes and printing directory trees directly from your terminal.

## Features

- Fetch a random joke or based on a search term
- View the directory tree of any given path

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
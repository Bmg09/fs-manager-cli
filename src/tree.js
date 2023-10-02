const fs = require('fs')
const path = require('path')

function bytesToMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB'
}

function calculateDirectorySize(dirPath) {
    const items = fs.readdirSync(dirPath)
    let totalSize = 0
  
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath)
  
      if (stats.isDirectory()) {
        totalSize += calculateDirectorySize(itemPath)
      } else {
        totalSize += stats.size
      }
    }
    
    return totalSize
}

function printDirectoryTree(dirPath, indent = '', excludeFolderName = '') {
    let folderSize = 0

  // Get the list of files and directories in the current directory
  const items = fs.readdirSync(dirPath)

  // Iterate over each item in the directory
  for (const item of items) {
    // Create the full path of the current item
    const itemPath = path.join(dirPath, item)

    // Get the item's stats
    const stats = fs.statSync(itemPath)

    // Check if it's a directory
    if (stats.isDirectory()) {
        if (item !== excludeFolderName) {
            const subFolderSize = calculateDirectorySize(itemPath)
            folderSize += subFolderSize
            console.log(`${indent}├── [${bytesToMB(subFolderSize)}] ${item}/`)
            
            // Recursively print the contents of the directory
            printDirectoryTree(itemPath, indent + '│   ', excludeFolderName)
          }
    } else {
      // Print the file name with size in brackets
      console.log(`${indent}└── [${bytesToMB(stats.size)}] ${item}`)
    }
  }
}

module.exports = {
    printDirectoryTree
}
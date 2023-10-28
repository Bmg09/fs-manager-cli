const fs = require('fs') 
const path = require('path') 
const mime = require('mime') 
const chalk = require('chalk')

function getAllFilesInDirectory(dirPath, excludeFolderName = '') {
    const files = [] 

    function collectFilesInDirectory(directory) {
        const items = fs.readdirSync(directory) 

        for (const item of items) {
            const itemPath = path.join(directory, item) 
            const stats = fs.statSync(itemPath) 

            if (stats.isDirectory()) {
                if (!item.startsWith('.') && item !== excludeFolderName) {
                    collectFilesInDirectory(itemPath) 
                }
            } else {
                files.push(itemPath) 
            }
        }
    }

    collectFilesInDirectory(dirPath) 
    return files 
}

function categorizeAndMoveFiles(dirPath, excludeFolderName = '', extension = []) {
    const filesArray = getAllFilesInDirectory(dirPath, excludeFolderName) 
    const filteredFilesArray = filesArray.filter((filePath) => {
        const mimeType = mime.getType(filePath) 
        const extensionFromMime = mime.getExtension(mimeType) 

        return extension.includes(extensionFromMime) 
    }) 
    for (const filePath of filteredFilesArray) {
        const mimeType = mime.getType(filePath)
        const extensionFromMime = mime.getExtension(mimeType)
        let destinationFolder = path.join(dirPath, 'Other')
    
        if (extension.includes(extensionFromMime)) {
            destinationFolder = path.join(dirPath, extensionFromMime.toUpperCase()) 
        }

        // Create the destination folder if it doesn't exist
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder) 
        }
        // Log the move
        console.log(`Moving ${chalk.red(filePath)} to ${chalk.green(destinationFolder)}`);

        // Move the file to the destination folder
        fs.renameSync(filePath, path.join(destinationFolder, path.basename(filePath))) 
    }
}

module.exports = {
    categorizeAndMoveFiles
}
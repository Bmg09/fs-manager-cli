const fs = require('fs');
const path = require('path');

function getAllFilesInDirectory(dirPath, excludeFolderName = '') {
    const files = [];

    function collectFilesInDirectory(directory) {
        const items = fs.readdirSync(directory);

        for (const item of items) {
            const itemPath = path.join(directory, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                if (!item.startsWith('.') && item !== excludeFolderName) {
                    collectFilesInDirectory(itemPath);
                }
            } else {
                files.push(itemPath);
            }
        }
    }

    collectFilesInDirectory(dirPath);
    return files;
}

function categorizeAndMoveFiles(dirPath, excludeFolderName = '', extension = []) {
    const filesArray = getAllFilesInDirectory(dirPath, excludeFolderName);

    for (const filePath of filesArray) {
        const fileExtension = path.extname(filePath).toLowerCase();

        let destinationFolder = path.join(dirPath, 'Other'); // Default to 'Other' folder

        // Check if the file extension is in the extension array
        if (extension.includes(fileExtension)) {
            destinationFolder = path.join(dirPath, fileExtension.slice(1).toUpperCase());
        }

        // Create the destination folder if it doesn't exist
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder);
        }

        // Move the file to the destination folder
        fs.renameSync(filePath, path.join(destinationFolder, path.basename(filePath)));
    }
}

module.exports = {
    categorizeAndMoveFiles
};
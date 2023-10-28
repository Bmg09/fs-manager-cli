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
    console.log(files);
    return files;
}


function categorizeAndMoveFiles(dirPath, excludeFolderName = '', extension = []) {
    const filesArray = getAllFilesInDirectory(dirPath, excludeFolderName);
    
    for (const filePath of filesArray) {
        const mimeType = mime.lookup(filePath);

        let destinationFolder;

        switch (mimeType) {
            case 'image/jpeg':
                destinationFolder = path.join(dirPath, 'JPG');
                break;
            case 'application/pdf':
                destinationFolder = path.join(dirPath, 'PDF');
                break;
            // Add more cases for other MIME types as needed
            default:
                destinationFolder = path.join(dirPath, 'Other');
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


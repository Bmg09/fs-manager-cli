const fs = require('fs');
const path = require('path');

function createDirectoryTreeJSON(dirPath, excludeFolderName = '') {
    const directoryTree = {};

    function traverseDirectory(currentPath, currentTree) {
        const items = fs.readdirSync(currentPath);

        for (const item of items) {
            const itemPath = path.join(currentPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                if (item !== excludeFolderName) {
                    const subTree = {};
                    currentTree[item] = subTree;
                    traverseDirectory(itemPath, subTree);
                }
            } else {
                currentTree[item] = null; // Exclude file sizes
            }
        }
    }

    traverseDirectory(dirPath, directoryTree);
    fs.writeFileSync(`${dirPath}${path.sep}directory_backup.json`, JSON.stringify(directoryTree, null, 2));
}

module.exports = {
    createDirectoryTreeJSON,
};



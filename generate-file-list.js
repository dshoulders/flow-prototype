const fs = require('fs');
const FileList = require('filelist').FileList;

'use strict';

const generateFileList = () => {
    const allFiles = new FileList();
    allFiles.include('out/**/*.*');
    allFiles.exclude('**/*.webmanifest');
    allFiles.exclude('**/service-worker.js');

    const rootRelativeUrls = allFiles.map(fileName => fileName.replace('out', ''));

    const data = JSON.stringify(rootRelativeUrls.toArray());
    fs.writeFileSync('./out/file-list.json', data);
};

module.exports = { generateFileList };
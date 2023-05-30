/***
* Copyright (c) 2023-2023 - All Rights Reserved
*/
const os = require('os');
const path = require('path');

let file = '';
switch (os.platform()) {
    case 'darwin':
        file = 'cld3-macos.node';
        break;
    case 'linux':
        file = 'cld3-linux.node';
        break;
}
if (!file) {
    throw new Error('cld3 is not supported on this platform.');
}

const cld3 = require(path.join(__dirname, 'addons', file));

module.exports.getLanguage = cld3.getLanguage;

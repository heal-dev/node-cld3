const os = require('os');
const path = require('path');

let file = '';
switch (os.platform()) {
    case 'darwin':
        file = 'cld3-darwin-x64.node';
        break;
    case 'linux':
        file = 'cld3-linux-x64.node';
        break;
}
if (!file) {
    throw new Error('cld3 is not supported on this platform.');
}

const cld3 = require(path.join(__dirname, 'addons', file));

module.exports.getLanguages = cld3.getLanguages;

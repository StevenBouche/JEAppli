const cryptoUtils = require('./CryoUtils.js');
const fs = require('fs');
var path = require('path');

const PasswordManager = {};

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function getKey() {
    var jsonPath = path.join(__dirname, '..', 'Certificat', 'key.json');
    let rawdata = fs.readFileSync(jsonPath);
    let data = JSON.parse(rawdata);
    return data.key;
}

PasswordManager.encrypt = (text) => {
    let key = getKey();
    let ciphertext = cryptoUtils.encrypt(Buffer.from(key), text);
    return ciphertext;
}

PasswordManager.decrypt = (ciphertext) => {
    let key = getKey();
    let decryptOutput = cryptoUtils.decrypt(Buffer.from(key), ciphertext);
    return decryptOutput;
}

module.exports = PasswordManager;
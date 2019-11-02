const crypto = require('crypto');

var exports = module.exports = {};

exports.encrypt = encrypt = (key, text) => {
    let iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(64);
    const keym = crypto.pbkdf2Sync(key, salt, 2145, 32, 'sha512');
    let cipher = crypto.createCipheriv('aes-256-cbc', keym, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + salt.toString('hex') + ":" + encrypted.toString('hex') ;
}

exports.decrypt = decrypt = (key, text) => {
    var text2 = text.toString();
    let textParts = text2.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let salt = Buffer.from(textParts.shift(), 'hex');
    const keym = crypto.pbkdf2Sync(key, salt, 2145, 32, 'sha512');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', keym, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
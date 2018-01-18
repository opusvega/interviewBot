//read upcoming candidates records and ecrypt email and send these to HR

const CryptoJS = require('crypto-js');
const config = require('../config.js')
const secret = config.secret;

async function encryptEmail(email){
    let ciphertext = await CryptoJS.AES.encrypt(email,secret).toString();
    console.log("before formatting===>",ciphertext);
    ciphertext = ciphertext.replace(/\//g, '_').replace(/\+/,'sulp');
    return ciphertext;
}

async function decryptEmail(encryptedEmail){
    encryptedEmail = encryptedEmail.replace('_','/').replace('sulp','+');
    let bytes  = await CryptoJS.AES.decrypt(encryptedEmail.toString(), secret);
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);     
    console.log(plaintext);
    return plaintext;
}

module.exports.encryptEmail = encryptEmail;
module.exports.decryptEmail = decryptEmail;


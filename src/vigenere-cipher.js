const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
    constructor(isDirect = true) {
        this.isDirect = isDirect;
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    };


    encrypt(message, key) {
        if (message === undefined || key === undefined) {
            throw new Error();
        };

        let result = [];
        message = message.toUpperCase();
        key = key.toUpperCase();
        let keyIndex = 0;
        for (let i = 0; i < message.length; i++) {
            if (!message[i].match(/[A-Z]/)) {
                result.push(message[i]);
            } else {
                let sum = this.alphabet.indexOf(message[i]) + this.alphabet.indexOf(key[(keyIndex % (key.length))]);
                if (sum > 25) {
                    result.push(this.alphabet[sum % 26]);
                } else {
                    result.push(this.alphabet[sum]);
                }
                keyIndex++;
            }
        };

        if (this.isDirect) {
            return result.join('');
        } else {
            return result.reverse().join('');
        };
    };


    decrypt(encryptedMessage, key) {
        if (encryptedMessage === undefined || key === undefined) {
            throw new Error();
        };

        let result = [];
        encryptedMessage = encryptedMessage.toUpperCase();
        key = key.toUpperCase();
        let keyIndex = 0;

        for (let i = 0; i < encryptedMessage.length; i++) {
            if (!encryptedMessage[i].match(/[A-Z]/)) {
                result.push(encryptedMessage[i])
            } else {
                let sum = this.alphabet.indexOf(encryptedMessage[i]) + 26 - this.alphabet.indexOf(key[keyIndex % (key.length)]);
                if (sum > 25) {
                    result.push(this.alphabet[sum % 26]);
                } else {
                    result.push(this.alphabet[sum]);
                }
                keyIndex++;
            };
        };

        if (this.isDirect) {
            return result.join('');
        } else {
            return result.reverse().join('');
        };
    };
}

module.exports = VigenereCipheringMachine;

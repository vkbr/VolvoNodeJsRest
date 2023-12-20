"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom = void 0;
const crypto_1 = require("crypto");
const generateRandom = (len = 32) => new Promise((res, rej) => {
    (0, crypto_1.randomBytes)(len, (err, buffer) => {
        if (err)
            rej(err);
        else
            res(buffer);
    });
});
exports.generateRandom = generateRandom;

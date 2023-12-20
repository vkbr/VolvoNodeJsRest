"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySig = exports.sign = void 0;
const node_crypto_1 = require("node:crypto");
const sign = (val, secret) => {
    return `${val}.${(0, node_crypto_1.createHmac)('sha256', secret)
        .update(val)
        .digest('base64')
        .replace(/\=+$/, '')}`;
};
exports.sign = sign;
const verifySig = (input, secret) => {
    const [message] = input.split('.');
    const expectedMessage = (0, exports.sign)(message, secret);
    const expectedMessageBuffer = Buffer.from(expectedMessage);
    const inputBuffer = Buffer.from(input);
    return (0, node_crypto_1.timingSafeEqual)(inputBuffer, expectedMessageBuffer);
};
exports.verifySig = verifySig;

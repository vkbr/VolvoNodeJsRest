"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customers = void 0;
const db_1 = require("../../src/db");
const dtInOneYear = new Date(Date.now() + 356 * 24 * 3600 * 1000);
exports.customers = [
    {
        id: 'clqea6xvu00002xttd06v48zt',
        email: 'user1@gmail.com',
        password: '682cc9934e6f808a40b81740e62b9f0d8748a99c4dfbb3cbfd3ef1736c5669e460d73140f7beebfcda3f926da01f5b1e96e4f7b8bd66877d517b80b320f07f45',
        passwordSalt: 'b46196a885c43af560e42ab448f9140856238e07574f838e71bacd13eb46c05891dc061a5fd5ab78aa9d424328167bb3213604e9444efaa4921ea8935c3a79aa',
        role: db_1.Roles.ADMIN,
        signupOtp: {
            create: {
                expiry: dtInOneYear,
                verificationCode: 'user1-code',
            },
        },
    },
    {
        id: 'clqe9r3sk00001rx8g7p5h0um',
        email: 'user2@gmail.com',
        password: '09d4dff5ca3a5ab3f24f91e3961d1bf5edef63424bde8ba89344068e2d4acab203a07d0499914b41a28612cdba0f48f530d3b6bec19d2c14e096aaea5dd7672e',
        passwordSalt: '049825092621f91339eacc40c27b228173e4d3f611d091410940cdf505fce717f3b9a48df31ba6dc505bbe92fd518d56ddb1d90f882ea2919c4b7dc89fb1adcb',
        signupOtp: {
            create: {
                expiry: dtInOneYear,
                verificationCode: 'user2-code',
            },
        },
    },
];

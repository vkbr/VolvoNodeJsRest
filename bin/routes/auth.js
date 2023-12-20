"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const login_1 = require("../models/login");
const token_1 = require("../models/token");
const auth_1 = require("../utils/auth");
const db_1 = require("../utils/db");
const random_1 = require("../utils/random");
const sanitize_1 = require("../utils/sanitize");
const router = (0, express_1.Router)();
exports.authRouter = router;
const oneDayMs = 86400000000;
const ninetyDayMs = 7776000000;
router.post('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = token_1.RefreshAccessTokenRequest.fromJSON(req.body);
    if (!(0, auth_1.verifyRefreshToken)(payload.refreshToken)) {
        return res.status(403).send('unauthorised');
    }
    const tokenInfo = yield db_1.prismaClient.tokenInfo.findUnique({
        where: {
            refreshToken: payload.refreshToken,
        },
    });
    if (!tokenInfo) {
        return res.status(403).send('unauthorised');
    }
    res
        .status(200)
        .json(token_1.TokenInfo.builder()
        .accessToken((0, auth_1.signJwt)(tokenInfo.customerId))
        .refreshToken(payload.refreshToken)
        .build());
}));
router.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const loginRequest = login_1.FormLoginRequest.fromJSON(body);
    const customerRecord = yield db_1.prismaClient.customer.findUnique({
        where: {
            email: loginRequest.email,
        },
    });
    if (customerRecord === null) {
        return res.status(404).send('The account does not exist.');
    }
    const hashedInputPassword = yield (0, auth_1.hashPassword)(loginRequest.password, customerRecord.passwordSalt);
    if (hashedInputPassword !== customerRecord.password) {
        return res.status(401).send('Email and password does not match');
    }
    const refreshToken = yield (0, auth_1.generateRefreshToken)();
    yield db_1.prismaClient.tokenInfo.create({
        data: {
            customerId: customerRecord.id,
            refreshToken,
            exipry: new Date(Date.now() + ninetyDayMs),
        },
    });
    res
        .status(200)
        .json(token_1.TokenInfo.builder()
        .accessToken((0, auth_1.signJwt)(customerRecord.id))
        .refreshToken(refreshToken)
        .build());
}));
router.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const signupRequest = login_1.SignupRequest.fromJSON(body);
    const passwordSalt = (yield (0, random_1.generateRandom)(64)).toString('hex');
    const hashedPassword = yield (0, auth_1.hashPassword)(signupRequest.password, passwordSalt);
    const createdCustomer = yield db_1.prismaClient.customer.create({
        data: {
            email: signupRequest.email,
            password: hashedPassword,
            passwordSalt,
            signupOtp: {
                create: {
                    expiry: new Date(Date.now() + oneDayMs),
                    verificationCode: (yield (0, random_1.generateRandom)())
                        .toString('base64')
                        .replace(/[^0-0a-zA-Z]/g, '')
                        .substring(0, 6),
                },
            },
        },
    });
    res.status(200).json((0, sanitize_1.sanitizeCustomer)(createdCustomer));
}));

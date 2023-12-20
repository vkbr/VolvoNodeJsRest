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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const error_1 = require("../models/error");
const login_1 = require("../models/login");
const token_1 = require("../models/token");
const db_1 = require("../utils/db");
const router = (0, express_1.Router)();
exports.authRouter = router;
// const loginRequestDecoder = createDecoderFromProtoLike(LoginRequest);
const err400Resp = login_1.LoginResponse.builder({
    error: error_1.ErrorResponse.builder({ code: 400, msg: 'Invalid input.' }).build(),
}).build();
router.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { body } = req;
    const loginRequest = login_1.LoginRequest.fromJSON(body);
    const username = (_a = loginRequest.formLoginRequest) === null || _a === void 0 ? void 0 : _a.email.split('@').at(0);
    let response = err400Resp;
    if (((_b = loginRequest.formLoginRequest) === null || _b === void 0 ? void 0 : _b.password) !== 'pw') {
        return res.sendUnauthenticated('Invalid email/password.');
    }
    const userWithAuth = yield db_1.prismaClient.user.findUnique({
        where: {
            email: (_c = loginRequest.formLoginRequest) === null || _c === void 0 ? void 0 : _c.email,
        },
        include: {
            auth: true,
        },
    });
    if (!userWithAuth) {
        return res.sendUnauthenticated('Invalid email/password.');
    }
    const { auth } = userWithAuth, user = __rest(userWithAuth, ["auth"]);
    if (user) {
        response = login_1.LoginResponse.builder({
            data: login_1.SuccessLoginResponse.builder({
                user,
                tokenInfo: token_1.TokenInfo.builder({
                    token: `Testuser ${username}`,
                    expiresAfterMs: 360 * 24 * 3600 * 1000,
                }).build(),
            }).build(),
        }).build();
    }
    res.json(response);
}));
router.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const addedUser = yield db_1.prismaClient.user.create({
            data: {
                email: body.email,
                name: body.name,
            },
        });
        if (addedUser) {
            return res.json(login_1.LoginResponse.builder({
                data: login_1.SuccessLoginResponse.builder({
                    user: addedUser,
                    tokenInfo: token_1.TokenInfo.builder({
                        token: `Testuser ${addedUser.email.split('@').at(0)}`,
                        expiresAfterMs: 360 * 24 * 3600 * 1000,
                    }).build(),
                }).build(),
            }).build());
        }
    }
    catch (err) {
        console.error(err);
    }
}));

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
exports.authMiddlewares = exports.getSubjectUserId = void 0;
const auth_1 = require("../utils/auth");
const authMiddlewares = [];
exports.authMiddlewares = authMiddlewares;
const reqUserId = new WeakMap();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
        const unpacked = (0, auth_1.unpackJwt)(req.headers.authorization.substring(7));
        const expiresIn = unpacked === null || unpacked === void 0 ? void 0 : unpacked.exp;
        if (typeof expiresIn === 'number') {
            const expresInMs = expiresIn * 1000;
            if (Date.now() < expresInMs) {
                reqUserId.set(req, unpacked.userId);
            }
        }
    }
    next();
});
const getSubjectUserId = (req) => reqUserId.get(req);
exports.getSubjectUserId = getSubjectUserId;
authMiddlewares.push(authMiddleware);

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
exports.customerRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middlewares/auth");
const customer_1 = require("../models/customer");
const auth_2 = require("../utils/auth");
const db_2 = require("../utils/db");
const sanitize_1 = require("../utils/sanitize");
const router = (0, express_1.Router)();
exports.customerRouter = router;
const protectedResource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectUserId = (0, auth_1.getSubjectUserId)(req);
    const subject = subjectUserId
        ? yield db_2.prismaClient.customer.findUnique({
            where: {
                id: subjectUserId,
            },
        })
        : undefined;
    const editAllowed = (subject === null || subject === void 0 ? void 0 : subject.role) === db_1.Roles.ADMIN || (subject === null || subject === void 0 ? void 0 : subject.id) === req.params.customerId;
    if (!editAllowed) {
        console.log({ subjectEmail: subjectUserId, subject });
        return res.status(403).send('unauthorized');
    }
    next();
});
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectUserId = (0, auth_1.getSubjectUserId)(req);
    console.log({ subjectUserId });
    if (!subjectUserId) {
        return res.status(401).send('unauthenticated');
    }
    const customers = yield db_2.prismaClient.customer.findMany({});
    res.status(200).json(customers.map(sanitize_1.sanitizeCustomer));
}));
router.post('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = customer_1.VerifyAccountRequest.fromJSON(req.body);
    const otpRecord = yield db_2.prismaClient.customerSignupOtp.findFirst({
        where: {
            customerId: payload.customerId,
            verificationCode: payload.otp,
            expiry: {
                gt: new Date(),
            },
        },
    });
    if (!otpRecord) {
        return res.status(400).send('Incorrect or expired code.');
    }
    yield db_2.prismaClient.customer.update({
        data: {
            isVerified: true,
        },
        where: {
            id: payload.customerId,
        },
    });
    yield db_2.prismaClient.customerSignupOtp.delete({
        where: {
            id: otpRecord.id,
        },
    });
    res.status(200).send('verified');
}));
router.put('/:customerId', protectedResource, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = customer_1.UpdateCustomerRequest.fromJSON(req.body);
    const customer = yield db_2.prismaClient.customer.findUnique({
        where: {
            id: req.params.customerId,
        },
    });
    if (!customer) {
        return res.status(404).send();
    }
    const hashedPassword = payload.password
        ? yield (0, auth_2.hashPassword)(payload.password, customer.passwordSalt)
        : undefined;
    const updatedCustome = yield db_2.prismaClient.customer.update({
        where: {
            id: req.params.customerId,
        },
        data: {
            email: payload.email,
            password: hashedPassword,
        },
    });
    res.status(200).json((0, sanitize_1.sanitizeCustomer)(updatedCustome));
}));
router.delete('/:customerId', protectedResource, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_2.prismaClient.customer.delete({
        where: {
            id: req.params.customerId,
        },
    });
    res.status(200).send('deleted');
}));

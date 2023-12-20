"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.customerRouter = router;
router.get('/me', (req, res) => {
    res.json({});
});

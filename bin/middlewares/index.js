"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const auth_1 = require("./auth");
exports.middlewares = [...devMiddlewares, ...auth_1.authMiddlewares];

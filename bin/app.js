"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const node_http_1 = require("node:http");
require("./utils/env");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080', 10);
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// app.use(express.raw());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(middlewares_1.middlewares);
app.use('/', routes_1.appRouter);
const server = (0, node_http_1.createServer)(app);
server.listen(port, '0.0.0.0', () => {
    console.log(`Running at http://localhost:${port} or http://0.0.0.0:${port}`);
});
process.on('SIGUP', () => {
    console.debug('SIGUP');
    server.close();
});
process.on('SIGINT', () => {
    console.debug('SIGINT');
    server.close();
});

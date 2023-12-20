"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtGenericResponse = exports.builtUnauthenticatedResponse = exports.buildError = exports.GenericErrorResponse = exports.ErrorResponse = void 0;
const builder_pattern_1 = require("builder-pattern");
class ErrorResponse {
    static fromJSON(json) {
        return ErrorResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.ErrorResponse = ErrorResponse;
class GenericErrorResponse {
    static fromJSON(json) {
        return GenericErrorResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.GenericErrorResponse = GenericErrorResponse;
const buildError = ({ msg, code }) => GenericErrorResponse.builder({
    error: ErrorResponse.builder({
        code: code !== null && code !== void 0 ? code : 500,
        msg: msg !== null && msg !== void 0 ? msg : 'Something went wrong.',
    }).build(),
}).build();
exports.buildError = buildError;
exports.builtUnauthenticatedResponse = (0, exports.buildError)({
    code: 401,
    msg: 'Unauthenticated',
});
exports.builtGenericResponse = (0, exports.buildError)({});

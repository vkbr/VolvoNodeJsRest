"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.SuccessLoginResponse = exports.LoginRequest = exports.FormLoginRequest = void 0;
const builder_pattern_1 = require("builder-pattern");
class FormLoginRequest {
}
exports.FormLoginRequest = FormLoginRequest;
class LoginRequest {
    static fromJSON(json) {
        return LoginRequest.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.LoginRequest = LoginRequest;
class SuccessLoginResponse {
    static fromJSON(json) {
        return SuccessLoginResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.SuccessLoginResponse = SuccessLoginResponse;
class LoginResponse {
    static fromJSON(json) {
        return LoginResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.LoginResponse = LoginResponse;

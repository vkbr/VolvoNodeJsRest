"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRequest = exports.FormLoginRequest = void 0;
const builder_pattern_1 = require("builder-pattern");
class FormLoginRequest {
    static fromJSON(json) {
        return FormLoginRequest.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.FormLoginRequest = FormLoginRequest;
class SignupRequest {
    static fromJSON(json) {
        return SignupRequest.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.SignupRequest = SignupRequest;
// export class SuccessLoginResponse {
//   user!: User;
//   tokenInfo!: TokenInfo;
//   static fromJSON(json: object): SuccessLoginResponse {
//     return SuccessLoginResponse.builder(json).build();
//   }
//   static get builder() {
//     return Builder<SuccessLoginResponse>;
//   }
// }
// export class LoginResponse {
//   data?: SuccessLoginResponse;
//   error?: ErrorResponse;
//   static fromJSON(json: object): LoginResponse {
//     return LoginResponse.builder(json).build();
//   }
//   static get builder() {
//     return Builder<LoginResponse>;
//   }
// }

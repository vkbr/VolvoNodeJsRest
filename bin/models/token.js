"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessTokenRequest = exports.TokenInfo = void 0;
const builder_pattern_1 = require("builder-pattern");
class TokenInfo {
    static fromJSON(json) {
        return TokenInfo.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.TokenInfo = TokenInfo;
class RefreshAccessTokenRequest {
    static fromJSON(json) {
        return RefreshAccessTokenRequest.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.RefreshAccessTokenRequest = RefreshAccessTokenRequest;

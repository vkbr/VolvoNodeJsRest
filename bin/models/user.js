"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
const builder_pattern_1 = require("builder-pattern");
class UserInfo {
    static fromJSON(json) {
        return UserInfo.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.UserInfo = UserInfo;

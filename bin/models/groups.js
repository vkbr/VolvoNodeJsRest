"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveGroupResponse = exports.GetGroupResponse = exports.GroupResponse = void 0;
const builder_pattern_1 = require("builder-pattern");
class GroupResponse {
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.GroupResponse = GroupResponse;
class GetGroupResponse {
    static fromJSON(json) {
        return GetGroupResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
}
exports.GetGroupResponse = GetGroupResponse;
class LeaveGroupResponse {
    static fromJSON(json) {
        return LeaveGroupResponse.builder(json).build();
    }
    static get builder() {
        return builder_pattern_1.Builder;
    }
    static groupNotFound() {
        return LeaveGroupResponse.builder({
            groupLeft: false,
            groupDeleted: false,
            groupNotFound: true,
        });
    }
}
exports.LeaveGroupResponse = LeaveGroupResponse;

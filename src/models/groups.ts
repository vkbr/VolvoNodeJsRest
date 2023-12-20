import { Builder } from 'builder-pattern';
import { Group, GroupUser, User } from '../db';
import { ErrorResponse } from './error';

export class GroupResponse {
  groupUser?: GroupUser;

  group?: Group & { groupUsers?: (GroupUser & { user?: User })[] };

  user?: User;

  error?: ErrorResponse;

  static get builder() {
    return Builder<GroupResponse>;
  }
}

export class GetGroupResponse {
  groups?: Group[];

  error?: ErrorResponse;

  static fromJSON(json: object): GetGroupResponse {
    return GetGroupResponse.builder(json).build();
  }

  static get builder() {
    return Builder<GetGroupResponse>;
  }
}

export class LeaveGroupResponse {
  groupLeft!: boolean;

  groupDeleted!: boolean;

  groupNotFound!: boolean;

  static fromJSON(json: object): LeaveGroupResponse {
    return LeaveGroupResponse.builder(json).build();
  }

  static get builder() {
    return Builder<LeaveGroupResponse>;
  }

  static groupNotFound() {
    return LeaveGroupResponse.builder({
      groupLeft: false,
      groupDeleted: false,
      groupNotFound: true,
    });
  }
}

import { Builder } from 'builder-pattern';

export class TokenInfo {
  accessToken!: string;
  refreshToken!: string;

  static fromJSON(json: object): TokenInfo {
    return TokenInfo.builder(json).build();
  }

  static get builder() {
    return Builder<TokenInfo>;
  }
}

export class RefreshAccessTokenRequest {
  refreshToken!: string;

  static fromJSON(json: object): RefreshAccessTokenRequest {
    return RefreshAccessTokenRequest.builder(json).build();
  }

  static get builder() {
    return Builder<RefreshAccessTokenRequest>;
  }
}

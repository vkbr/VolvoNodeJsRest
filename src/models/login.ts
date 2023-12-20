import { Builder } from 'builder-pattern';

export class FormLoginRequest {
  email!: string;
  password!: string;

  static fromJSON(json: object): FormLoginRequest {
    return FormLoginRequest.builder(json).build();
  }

  static get builder() {
    return Builder<FormLoginRequest>;
  }
}

export class SignupRequest {
  email!: string;
  password!: string;

  static fromJSON(json: object): SignupRequest {
    return SignupRequest.builder(json).build();
  }

  static get builder() {
    return Builder<SignupRequest>;
  }
}

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

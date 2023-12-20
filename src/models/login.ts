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

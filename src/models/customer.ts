import { Builder } from 'builder-pattern';

export class CreateCustomerRequest {
  email!: string;

  password!: string;

  static fromJSON(json: object): CreateCustomerRequest {
    return CreateCustomerRequest.builder(json).build();
  }

  static get builder() {
    return Builder<CreateCustomerRequest>;
  }
}

export class UpdateCustomerRequest {
  email?: string;
  password?: string;

  static fromJSON(json: object): UpdateCustomerRequest {
    return UpdateCustomerRequest.builder(json).build();
  }

  static get builder() {
    return Builder<UpdateCustomerRequest>;
  }
}

export class VerifyAccountRequest {
  customerId!: string;
  otp!: string;

  static fromJSON(json: object): VerifyAccountRequest {
    return VerifyAccountRequest.builder(json).build();
  }

  static get builder() {
    return Builder<VerifyAccountRequest>;
  }
}

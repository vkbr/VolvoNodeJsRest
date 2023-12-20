import { Builder } from 'builder-pattern';

export class ErrorResponse {
  code!: number;

  msg!: string;

  static fromJSON(json: object): ErrorResponse {
    return ErrorResponse.builder(json).build();
  }

  static get builder() {
    return Builder<ErrorResponse>;
  }
}

export class GenericErrorResponse {
  error!: ErrorResponse;

  static fromJSON(json: object): GenericErrorResponse {
    return GenericErrorResponse.builder(json).build();
  }

  static get builder() {
    return Builder<GenericErrorResponse>;
  }
}

export const buildError = ({ msg, code }: { code?: number; msg?: string }) =>
  GenericErrorResponse.builder({
    error: ErrorResponse.builder({
      code: code ?? 500,
      msg: msg ?? 'Something went wrong.',
    }).build(),
  }).build();

export const builtUnauthenticatedResponse = buildError({
  code: 401,
  msg: 'Unauthenticated',
});

export const builtGenericResponse = buildError({});

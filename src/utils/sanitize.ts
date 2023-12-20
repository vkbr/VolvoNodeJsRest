import { Customer } from '../db';

export const sanitizeCustomer = (customer: Customer) => {
  // return customer;
  const { password: _pw, passwordSalt: _ps, ...rest } = customer;

  return rest;
};

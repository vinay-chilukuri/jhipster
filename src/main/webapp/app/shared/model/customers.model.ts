export interface ICustomers {
  id?: string;
  name?: string;
  age?: number;
  email?: string;
  contact?: number;
}

export const defaultValue: Readonly<ICustomers> = {};

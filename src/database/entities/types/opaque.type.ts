declare const typeID: unique symbol;

export type Opaque<T, Identifier extends string> = T & {
  [typeID]: Identifier;
};

// https://evertpot.com/opaque-ts-types/
// declare const  : unique symbol;
//
// export type User = {
//   firstName: string;
//   lastName: string;
//   email: Email
// }

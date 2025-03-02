import { Opaque } from './opaque.type';

export type UserID = Opaque<string, 'UserID'>;
export type PostID = Opaque<string, 'PostID'>;
export type RefreshTokenID = Opaque<string, 'RefreshTokenID'>;

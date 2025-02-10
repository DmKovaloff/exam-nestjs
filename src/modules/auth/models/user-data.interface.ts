import { UserID } from '../../../database/entities/types/entity-ids.type';

export interface IUserData {
  userId: UserID;
  email: string;
}

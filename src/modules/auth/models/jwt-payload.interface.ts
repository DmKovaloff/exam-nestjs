import { UserID } from '../../../database/entities/types/entity-ids.type';

export interface IJwtPayload {
  userId: UserID;
}

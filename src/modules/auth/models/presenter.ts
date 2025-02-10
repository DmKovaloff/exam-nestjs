import { User } from '../../../database/entities/user.entity';
import { UserResDto } from '../../user/dto/user.res.dto';
import { IUserData } from './user-data.interface';

export class Presenter {
  public static presentResDto(user: User): UserResDto {
    return {
      id: user.id,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      age: user.age,
      city: user.city,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  public static userDataDto(user: User): IUserData {
    return {
      userId: user.id,
      email: user.email,
    };
  }
}

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../interfaces/user-data.interface';

export class UserMapper {
  public static toUserData(user: UserEntity): IUserData {
    return {
      id: user.id,
      email: user.email,
    };
  }
}

import { UserEntity } from '../../../database/entities/user.entity';
import { BaseAuthResDto } from '../dto/res/base.auth.res.dto';

export class UserMapper {
  public static toResponseDTO(entity: UserEntity): BaseAuthResDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      avatar: entity?.avatar ?? null,
    };
  }
}

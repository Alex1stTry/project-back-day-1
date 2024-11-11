import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repository/services/user.repository';
import { AuthRegisterReqDto } from '../dto/req/auth.register.req.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}
  public async register(dto: AuthRegisterReqDto): Promise<UserEntity> {
    await this.isEmailTaken(dto.email);
    const hashedPass = bcrypt.hashSync(dto.password, 5);

    return await this.userRepo.save(
      this.userRepo.create({ ...dto, password: hashedPass }),
    );
  }

  private async isEmailTaken(email: string): Promise<any> {
    const takenEmail = await this.userRepo.findOneBy({ email });
    if (takenEmail) {
      throw new ConflictException();
    }
  }
}

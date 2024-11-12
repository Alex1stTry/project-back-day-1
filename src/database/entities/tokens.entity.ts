import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BasicModel } from './models/basic-model';
import { UserEntity } from './user.entity';

@Entity('Tokens')
export class TokensEntity extends BasicModel {
  @Column('text')
  accessToken: string;

  @Column('text')
  refreshToken: string;

  @Column('uuid')
  user_id: string;
  @OneToOne(() => UserEntity, (entity) => entity.tokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}

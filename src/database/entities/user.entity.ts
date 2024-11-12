import { Column, Entity, OneToOne } from 'typeorm';

import { BasicModel } from './models/basic-model';
import { TokensEntity } from './tokens.entity';

@Entity('Users')
export class UserEntity extends BasicModel {
  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  avatar: string;

  @Column('text', { default: 'user' })
  role: string;

  @OneToOne(() => TokensEntity, (entity) => entity.user)
  tokens?: TokensEntity;
}

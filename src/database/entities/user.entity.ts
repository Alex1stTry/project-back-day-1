import { Column, Entity } from 'typeorm';

import { BasicModel } from './models/basic-model';

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
}

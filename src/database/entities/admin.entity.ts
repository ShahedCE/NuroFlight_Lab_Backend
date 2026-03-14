import {
  Column,
  Entity,
} from 'typeorm';

import { BaseEntityWithTimestamps } from './base.entity';

@Entity('admins')
export class Admin extends BaseEntityWithTimestamps {

  @Column({
    type: 'varchar',
    length: 150,
    unique: true, // Email must be unique
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string; // Password will be stored as a bcrypt hash

}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admins')
export class Admin{
@PrimaryGeneratedColumn('uuid')
id: string;

 @Column({
    type: "varchar",
    length:50
 })
 name: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true, // no duplicate email
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255, 
  })
  passwordHash: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
}




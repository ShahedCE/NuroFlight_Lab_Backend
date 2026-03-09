import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  subject: string;

  @Column({
    type: 'text',
  })
  message: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
}
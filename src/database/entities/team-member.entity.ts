import { Column, Entity, Index } from 'typeorm';
import { BaseEntityWithTimestamps } from './base.entity';
import { TeamGroup } from '../../common/enums/team-group.enum';
import { TeamTag } from '../../common/enums/team-tag.enum';

@Entity('team_members')
export class TeamMember extends BaseEntityWithTimestamps {
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 220,
    unique: true, // profile URL এর জন্য
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  primaryAffiliation?: string;

  @Column({
    type: 'varchar',
    length: 500, // uploaded image path/url
  })
  imageUrl: string;

  @Column({
    type: 'jsonb',
    default: () => "'[]'", // bio lines array
  })
  bioLines: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  expertise?: string[];

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
  })
  tags?: TeamTag[];

  @Column({
    type: 'enum',
    enum: TeamGroup,
  })
  group: TeamGroup;

  @Column({
    type: 'int',
    nullable: true, // ordering এর জন্য useful
  })
  priority?: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  linkedin?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  github?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  scholar?: string;
}
import { Column, Entity, Index } from "typeorm";
import { BaseEntityWithTimestamps } from "./base.entity";
import { ProjectStatus } from "src/common/enums/project-status.enum";


@Entity('projects') //table name

export class Project extends BaseEntityWithTimestamps{

@Column({ type: 'varchar', length: 200})
title: string;

@Column({type:'text'})
description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus, // allowing only ONGOING or COMPLETED 
  })
  status: ProjectStatus;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: [], // empty array default
  })
  tags?: string[];

  @Index({ unique: true }) // slug will be searched,so index useful
  @Column({
    type: 'varchar',
    length: 220,
    unique: true,
  })
  slug: string;
}


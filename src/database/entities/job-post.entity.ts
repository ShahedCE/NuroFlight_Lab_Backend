import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntityWithTimestamps } from "./base.entity";
import { JobTeam } from "src/common/enums/job-team.enum";
import { JobLevel } from "src/common/enums/job-level.enum";
import { JobType } from "src/common/enums/job-type.enum";
import { JobStatus } from "src/common/enums/job-status.enum";
import { JobApplication } from "./job-application.entity";

@Entity('job_posts')
export class JobPost extends BaseEntityWithTimestamps {
  @Column({
    type: 'varchar',
    length: 200,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: JobTeam,
  })
  team: JobTeam;

  @Column({
    type: 'enum',
    enum: JobLevel,
  })
  level: JobLevel;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  type: JobType;

  @Column({
    type: 'varchar',
    length: 150,
  })
  location: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus;

  @Column({
    type: 'text',
  })
  summary: string;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  responsibilities: string[];

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  requirements: string[];

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  tags: string[];

  @Column({
    type: 'date',
  })
  postedAt: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  deadline?: string;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.job)
  applications: JobApplication[];
}
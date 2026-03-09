import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntityWithTimestamps } from "./base.entity";
import { JobPost } from "./job-post.entity";

@Entity('job_applications')
export class JobApplication extends BaseEntityWithTimestamps {
  @Column({
    type: 'uuid',
  })
  jobId: string; // FK column

  @Column({
    type: 'varchar',
    length: 150,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 500, // uploaded CV path/url
  })
  cvFileUrl: string;

  @ManyToOne(() => JobPost, (jobPost) => jobPost.applications, {
    onDelete: 'CASCADE', 
  })
  @JoinColumn({ name: 'jobId' }) // this relation wwill use jobId column 
  job: JobPost;
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPost } from "src/database/entities/job-post.entity";
import { Repository } from "typeorm";
import { CreateJobPostDto } from "./dto/create-job-post.dto";
import { JobTeam } from "src/common/enums/job-team.enum";
import { JobLevel } from "src/common/enums/job-level.enum";
import { JobType } from "src/common/enums/job-type.enum";
import { JobStatus } from "src/common/enums/job-status.enum";
import { UpdateJobPostDto } from "./dto/update-job-post.dto";

@Injectable()
export class JobPostsService{
    constructor(
        @InjectRepository(JobPost)
        private readonly jobpostRepo: Repository<JobPost>
    ){}

    async create(jobpost: CreateJobPostDto){
        const createpost=  this.jobpostRepo.create(jobpost);

        return await this.jobpostRepo.save(createpost);
    }
     // Public: get all published jobs
  // optional filter: team, level, type
  async findAllPublic(
    team?: JobTeam,
    level?: JobLevel,
    type?: JobType,
  ): Promise<JobPost[]> {
    const queryBuilder = this.jobpostRepo.createQueryBuilder('job');

    //only the published jobs for public route 
    queryBuilder.where('job.status = :status', {
      status: JobStatus.PUBLISHED,
    });

    if (team) {
      queryBuilder.andWhere('job.team = :team', { team });
    }

    if (level) {
      queryBuilder.andWhere('job.level = :level', { level });
    }

    if (type) {
      queryBuilder.andWhere('job.type = :type', { type });
    }

    queryBuilder.orderBy('job.postedAt', 'DESC');
    queryBuilder.addOrderBy('job.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  // Admin: get all jobs
async findAllJobs():Promise<JobPost[]>{
    const allposts= await this.jobpostRepo.find({
        order:{
            postedAt:'DESC',
            createdAt:'DESC',
        }
    });
    return allposts;
}
//
  // Public/Admin: get by id
  async findOneById(id: string): Promise<JobPost> {
    const jobPost = await this.jobpostRepo.findOne({
      where: { id },
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    return jobPost;
  }


  // Admin: update
  async update(id: string, updateJobPostDto: UpdateJobPostDto): Promise<JobPost> {
    const jobPost = await this.findOneById(id);

    Object.assign(jobPost, updateJobPostDto);

    return await this.jobpostRepo.save(jobPost);
  }

  // Admin: delete
  async remove(id: string): Promise<{ message: string }> {
    const jobPost = await this.findOneById(id);

    await this.jobpostRepo.remove(jobPost);

    return {
      message: 'Job post deleted successfully',
    };
  }

}
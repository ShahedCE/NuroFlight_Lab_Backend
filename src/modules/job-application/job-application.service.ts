import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobApplication } from "src/database/entities/job-application.entity";
import { JobPost } from "src/database/entities/job-post.entity";
import { Repository } from "typeorm";
import { CreateJobApplicationDto } from "./dto/create-job-application.dto";
import { JobStatus } from "src/common/enums/job-status.enum";

@Injectable()
export class JobApplicationService{

    constructor(
        @InjectRepository(JobApplication)
        private readonly jobApplicationRepo: Repository<JobApplication>,

        @InjectRepository(JobPost)
        private readonly jobPostRepo: Repository<JobPost>
    ){}


     // Public: apply to a job
  async apply(
    jobId: string,
    createJobApplicationDto: CreateJobApplicationDto,
    cvFileUrl: string,
  ): Promise<JobApplication> {
    // আগে check করবো job post exists কিনা
    const jobPost = await this.jobPostRepo.findOne({
      where: { id: jobId },
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    // শুধু published job এ apply করা যাবে
    if (jobPost.status !== JobStatus.PUBLISHED) {
      throw new BadRequestException('This job is not open for applications');
    }

    // চাইলে duplicate application prevent করতে পারো
    // একই email একই job এ বারবার apply করলে block করবে
    const existingApplication = await this.jobApplicationRepo.findOne({
      where: {
        jobId,
        email: createJobApplicationDto.email,
      },
    });

    if (existingApplication) {
      throw new BadRequestException(
        'You have already applied for this job with this email',
      );
    }

    const jobApplication = this.jobApplicationRepo.create({
      ...createJobApplicationDto,
      jobId,
      cvFileUrl,
    });

    return await this.jobApplicationRepo.save(jobApplication);
  }

    // Admin: get all applications
  async findAll(): Promise<JobApplication[]> {
    return await this.jobApplicationRepo.find({
      relations: ['job'], // related job post info include করবে
      order: {
        createdAt: 'DESC',
      },
    });
  }


  // Admin: get one application by id
  async findOneById(id: string): Promise<JobApplication> {
    const application = await this.jobApplicationRepo.findOne({
      where: { id },
      relations: ['job'],
    });

    if (!application) {
      throw new NotFoundException('Job application not found');
    }

    return application;
  }

   // Admin: get all applications for a specific job
  async findByJobId(jobId: string): Promise<JobApplication[]> {
    // job exists কিনা check করা ভালো
    const jobPost = await this.jobPostRepo.findOne({
      where: { id: jobId },
    });

    if (!jobPost) {
      throw new NotFoundException('Job post not found');
    }

    return await this.jobApplicationRepo.find({
      where: { jobId },
      relations: ['job'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

 
}
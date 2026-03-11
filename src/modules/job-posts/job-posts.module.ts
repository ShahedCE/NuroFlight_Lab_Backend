import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPost } from "src/database/entities/job-post.entity";
import { JobPostsController } from "./job-posts.controller";
import { JobPostsService } from "./job-posts.service";

@Module({ 
    imports:[
        TypeOrmModule.forFeature([JobPost])
    ],
    controllers:[JobPostsController],
    providers:[JobPostsService],
})
export class JobPostsModule{}
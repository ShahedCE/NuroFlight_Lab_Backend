import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplication } from "src/database/entities/job-application.entity";
import { JobApplicationController } from "./job-application.controller";
import { JobApplicationService } from "./job-application.service";
import { JobPost } from "src/database/entities/job-post.entity";
import { JobApplicationListener } from "./listeners/job-application.listener";
import { MailModule } from "../mail/mail.module";

@Module({
    imports:[TypeOrmModule.forFeature([JobApplication,JobPost]),
    MailModule,
],
controllers:[JobApplicationController],
providers: [JobApplicationService,JobApplicationListener]

})
export class JobApplicationModule{}
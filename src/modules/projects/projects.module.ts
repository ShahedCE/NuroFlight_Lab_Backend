import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers:[ProjectService]
})
export class ProjectsModule {}

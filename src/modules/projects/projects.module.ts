import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/entities/project.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Project])
  ],
  controllers: [ProjectsController],
  providers:[ProjectService],
  exports:[ProjectService],//for future use in different module
})
export class ProjectsModule {}

import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService:ProjectService){}

@Get('all')
 findAllProjects(){
    return this.projectService.allProjects();
 }
}


import { Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectService:ProjectService){} //Dependency Injection

@Get('projects')
 async findAllProjects(){
    return this.projectService.allProjects();
 }

@Get('projects/:slug')
async getProjectBySlug(){
    return this.projectService.getProjectBySlug();
}

@Post('admin/project')
async createProject(){
    return this.projectService.createProject();
}

}


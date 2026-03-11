import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('')
export class ProjectsController {

    constructor(private readonly projectService:ProjectService){} //Dependency Injection

@Get('projects')
 async findAllProjects(){
 }

@Get('projects/:slug')
async getProjectBySlug(){
    return this.projectService.getProjectBySlug();
}

//Create
@Post('admin/project')
async createProject(@Body projectData:CreateProjectDto){
    return this.projectService.createProject();
}
@Patch('admin/projects/:id')
async updateProject(){

}
@Delete('admin/projects/:id')
async deleteProject(){

}

}


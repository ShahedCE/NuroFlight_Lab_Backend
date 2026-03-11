import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/database/entities/project.entity";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService{
 
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project> //to acces project table 
  ) {}


  //================
  // Public Services
  //===================
  async allProjects(): Promise<Project[]>{
    return await this.projectRepo.find({
      order:{
        createdAt: 'DESC'// leatest first
      },
    });
  }
  //By slug
  async getProjectBySlug(slug:string):Promise<Project>{
    const project= await this.projectRepo.findOne({
      where: {slug}
    })

    if(!project){
      throw new NotFoundException('Project not found');
    }
  return project;
  }
  
  //======= Admin ==========
  //CRUD
  //Create Project
  async createProject(projectData: CreateProjectDto): Promise<Project> {

    const exitingProject= await this.projectRepo.findOne({ where: {slug: projectData.slug} });

    if(exitingProject){
      throw new ConflictException("A project with this slug already exists!");
    }
   //DTO data instance
    const proj=  this.projectRepo.create(projectData);
    //DB Save
    return await this.projectRepo.save(proj);
  
  }
//for find project by id reuseable
async findOneById(id:string): Promise<Project>{

  const project= await this.projectRepo.findOne( { where: {id},  })
  if(!project){
    throw new NotFoundException('Project with this ID not found');
  }

return project;
}

 // Admin: update project by id
  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOneById(id);

    // duplicate slug check
    if (updateProjectDto.slug && updateProjectDto.slug !== project.slug) {
      const existingProject = await this.projectRepo.findOne({
        where: { slug: updateProjectDto.slug },
      });

      if (existingProject) {
        throw new ConflictException('A project with this slug already exists');
      }
    }

    // new data merge
    Object.assign(project, updateProjectDto);

    return await this.projectRepo.save(project);
  }
  
  //delete project
    async deleteProject(id:string): Promise<{message:string}> {
      
      const project= await this.findOneById(id);

      await this.projectRepo.remove(project);
      return {
        message:"Project deleted successfully"
      }
  }
 




  
}
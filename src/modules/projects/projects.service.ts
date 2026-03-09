import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectService{
 
  async allProjects(){
        return [
    {
      id: 1,
      title: "Drone Navigation System",
      description: "AI based drone navigation"
    },
    {
      id: 2,
      title: "Smart Agriculture",
      description: "IoT based farming system"
    }
  ];
  }

    async getProjectBySlug() {
      throw new Error('Method not implemented.');
  }
  async createProject(){
   throw new Error('Not Implemented');
  }





  
}
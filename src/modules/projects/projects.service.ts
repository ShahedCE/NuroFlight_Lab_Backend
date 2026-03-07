import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectService{

    allProjects(){
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

}
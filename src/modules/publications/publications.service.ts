import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Publication } from "src/database/entities/publication.entity";
import { Repository } from "typeorm";
import { CreatePublicationDto } from "./dto/create-puiblication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationsService{
  constructor(
    @InjectRepository(Publication)
    private readonly publicRepo: Repository<Publication>
  ){}




  //Admin Service

  //Create
  async createPublication( publicData: CreatePublicationDto):Promise<Publication>
  {
    const existing= await this.publicRepo.findOne( {where:{slug:publicData.slug} });
    if(existing){
        throw new ConflictException('Publication with this slug already exists');
    }

    //Entity Instance
    const pubication= this.publicRepo.create(publicData);
   //Save to DB
   return await this.publicRepo.save(pubication);
  }

  //findby id
  async findOneById(id:string){
    const publication= await this.publicRepo.findOne({ where:{id} });
    if(!publication){
        throw new NotFoundException('Publication Not Found');
    }
    return publication;
  }

  //Update
  async updatePublication(id:string,updateData: UpdatePublicationDto):Promise<Publication> {
        const publication = await this.findOneById(id);
    
        // duplicate slug check
        if (updateData.slug && updateData.slug !== publication.slug) {
          const existingProject = await this.publicRepo.findOne({
            where: { slug: updateData.slug },
          });
    
          if (existingProject) {
            throw new ConflictException('A project with this slug already exists');
          }
        }
    
        // new data merge
        Object.assign(publication,updateData);
    
        return await this.publicRepo.save(publication);
      }







      
  }



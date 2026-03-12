import { ConflictException, Get, Injectable, NotFoundException, Param } from "@nestjs/common";
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

//Public Route Services

async getAllPublications(): Promise<Publication[]> {

  const publications= await this.publicRepo.find({
    order:{
      createdAt:'DESC'
    }
  });

  return publications;
}

//get by slug

async getPublicationBySlug( slug:string): Promise<Publication> {

  const publication= await this.publicRepo.findOne({
   where:{slug}
  });

  if(!publication){
    throw new NotFoundException('Publication not found');
  }

  return publication;
}


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
  async updatePublication( id:string, updateData: UpdatePublicationDto):Promise<Publication> {
        const publication = await this.findOneById(id);
    
        // duplicate slug check
        if (updateData.slug && updateData.slug !== publication.slug) {
          const existingPublication = await this.publicRepo.findOne({
            where: { slug: updateData.slug },
          });
    
          if (existingPublication) {
            throw new ConflictException('A publication with this slug already exists');
          }
        }
    
        // new data merge
        Object.assign(publication,updateData);
    
        return await this.publicRepo.save(publication);
      }


//delete Publication
    async deletePublication(id:string): Promise<{message:string}> {
      
      const publication= await this.findOneById(id);

      await this.publicRepo.remove(publication);
      return {
        message:"Publication deleted successfully"
      }
  }





  }



import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { PublicationsService } from "./publications.service";
import { CreatePublicationDto } from "./dto/create-puiblication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Controller()

export class PublicationsController {
   constructor(private readonly publicationService: PublicationsService){}


  // =========================
  // Admin Routes
  // =========================

   @Post('admin/publications')
   async createPublication(@Body() publicationData: CreatePublicationDto){

   const publication= await this.publicationService.createPublication(publicationData);
   return {
    success:true,
    message: 'Publication created successfully',
    data:publication,
    }
   }

   //Update
   @Patch('admin/publications/:id')
   async updatePublication(@Param('id') id:string, @Body() updateData:UpdatePublicationDto){
     const updated= await this.publicationService.updatePublication(id,updateData);

    return {
    success:true,
    message: 'Publication updated successfully',
    data:updateData,
    }
   }


}
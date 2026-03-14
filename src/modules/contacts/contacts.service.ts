import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContactMessage } from "src/database/entities/contact-message.entity";
import { Repository } from "typeorm";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Injectable()
export class ContactsService{
    constructor(
        @InjectRepository(ContactMessage)
        private readonly contactRepo: Repository<ContactMessage>
    ){}
    
    //Public Create
    async create(contactmessageData: CreateContactMessageDto): Promise<ContactMessage>{

        const message=  this.contactRepo.create(contactmessageData);
        return await this.contactRepo.save(message);
    }

    //Admin
    //All messages

    async findAll(): Promise<ContactMessage[]>{
        const messages= await this.contactRepo.find({
            order:{
                createdAt: 'DESC',
            }
        });
        return messages;
    }

    // find by id
    async findOneById(id:string):Promise<ContactMessage>{
        const message= await this.contactRepo.findOne({
            where:{id}
        });

        if(!message){
            throw new NotFoundException('Contact message not found');
        }

        return message;
    }

    //Delete
    async remove(id:string):Promise<{message:string}>{
        const message= await this.findOneById(id);
        await this.contactRepo.remove(message);

        return {
            message:'Contact message deleted successfully',
        }
    }

}
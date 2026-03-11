import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactsController } from "./contacts.controller";
import { ContactMessage } from "src/database/entities/contact-message.entity";
import { ContactsService } from "./contacts.service";

@Module({ 
    imports:[
        TypeOrmModule.forFeature([ContactMessage])
    ],
    controllers:[ContactsController],
    providers:[ContactsService],
})
export class ContactsModule{}
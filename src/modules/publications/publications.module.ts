import { TypeOrmModule } from "@nestjs/typeorm";
import { Publication } from "src/database/entities/publication.entity";
import { PublicationsController } from "./publications.controller";
import { PublicationsService } from "./publications.service";
import { Module } from "@nestjs/common";

@Module({
    imports:[
        TypeOrmModule.forFeature([Publication])
    ],
    controllers:[PublicationsController],
    providers:[PublicationsService],
})

export class PublicationsModule{}
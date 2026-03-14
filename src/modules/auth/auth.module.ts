import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/database/entities/admin.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([Admin]),

    //JWT Configuration
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'my-secret-key123',
      signOptions:{
        expiresIn: '1d', //Token expires after 1 day
      },
    }),
],
controllers:[AuthController],
providers:[AuthService, JwtStrategy],

})

export class AuthModule{}



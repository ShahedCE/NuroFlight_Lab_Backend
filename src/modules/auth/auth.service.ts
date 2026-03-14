import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService{

    constructor(
        private readonly adminService:AdminService,
        private readonly jwtService: JwtService,     
    ){}

// Validate admin login credentials
//Authentication
    async validateAdmin(loginData:LoginDto){
       const admin= await this.adminService.findByEmail(loginData.email);

       if(!admin){
        throw new UnauthorizedException('Invalid email or password');
       }

       const passwordMatch= await bcrypt.compare(  //matching password with compare(plain pass,hashed pass)
        loginData.password, admin.password
       );

       if(!passwordMatch){
        throw new UnauthorizedException('Invalid email or password');
       }

       return admin;

    }

//Login and Generate JWT Token
async login(loginData: LoginDto){

    const admin= await this.validateAdmin(loginData);
    //payload
    const payload={
        sub: admin.id,
        email:admin.email,
    }

    const token = await this.jwtService.signAsync(payload);//generates token by payload
    return{
        accessToken: token,
    };
}



}
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController{

    constructor( private readonly authService:AuthService){}

    //Admin Login Route
    @Post('login')
    async login(@Body() loginData: LoginDto){
        const result= await this.authService.login(loginData);

        return {
            success:true,
            message: 'Login successful',
            data: result,
        }
    }

    
}
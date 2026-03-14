import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() //Import in auth module 
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Read token from Authorization header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY ||'my-secret-key123',
    });
  }

  
  async validate(payload:any){
    return {
      adminId: payload.sub,
      email: payload.email,
    };
  }
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
       whitelist: true, // automatically remove field ouside DTO
      forbidNonWhitelisted: true, // will give error to extra unexpected field 
      transform: true, // help to payload transform 
  }));  
   
  await app.listen(process.env.PORT ?? 3000);
  console.log("Server Running On: http://localhost:3000")
}
bootstrap();

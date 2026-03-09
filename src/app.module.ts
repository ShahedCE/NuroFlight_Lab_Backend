import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [ ProjectsModule,

     // .env file globally available now
    ConfigModule.forRoot({
      isGlobal:true
    }),

    // Database connection setup
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService )=> ({

        type:'postgres',
        host:configService.get("DB_HOST"),
        port:Number(configService.get("DB_PORT")),
        username:configService.get("DB_USERNAME") ,
        password:configService.get("DB_PASSWORD")  ,
        database:configService.get("DB_NAME")  ,
        
        autoLoadEntities:true,
        synchronize:false, //in development phase: true, in production false
        logging:true,

        extra: {
        options: '-c timezone=Asia/Dhaka',
        },})

    })
   ],

  controllers: [],
  providers: [],
})
export class AppModule {}

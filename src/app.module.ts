import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsModule } from './modules/publications/publications.module';
import { TeamModule } from './modules/team/team.module';
import { JobPostsModule } from './modules/job-posts/job-posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { JobApplicationModule } from './modules/job-applications/job-application.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    
    // Enables and configures the NestJS EventEmitter, used for domain events (e.g., job application notifications)
    EventEmitterModule.forRoot(),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        extra: {
          options: '-c timezone=Asia/Dhaka',
        },
      }),
    }),

    AuthModule,
    ProjectsModule,
    PublicationsModule,
    TeamModule,
    JobPostsModule,
    JobApplicationModule,
    ContactsModule,
  ],
})
export class AppModule {}
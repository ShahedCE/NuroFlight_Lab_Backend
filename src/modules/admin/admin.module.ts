import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../database/entities/admin.entity';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]), // Register Admin repository
  ],
  providers: [AdminService],
  exports: [AdminService], // Export so AuthModule can use it
})
export class AdminModule {}
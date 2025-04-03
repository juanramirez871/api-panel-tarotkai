import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeCallController } from './type-calls.controller';
import { TypeCallService } from './type-calls.service';
import { TypeCall } from 'src/database/models/type-calls.model';

@Module({
  imports: [SequelizeModule.forFeature([TypeCall])],
  providers: [TypeCallService],
  controllers: [TypeCallController],
  exports: [TypeCallService],
})
export class TypeCallModule { }

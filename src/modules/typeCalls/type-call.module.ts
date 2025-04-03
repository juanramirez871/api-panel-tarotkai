import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeCallController } from './type-calls.controller';
import { TypeCallService } from './type-calls.service';
import { TypeCall } from 'src/database/models/type-calls.model';
import { PermissionModule } from '../permissions/permissions.module';

@Module({
  imports: [SequelizeModule.forFeature([TypeCall]), PermissionModule],
  providers: [TypeCallService],
  controllers: [TypeCallController],
  exports: [TypeCallService],
})
export class TypeCallModule { }

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permissions.service';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule { }

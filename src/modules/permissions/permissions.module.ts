import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { PermissionController } from './permissions.controller';
import { PermissionService } from './permissions.service';
import { User } from 'src/database/models/user.model';
import { Module as ModuleModel } from 'src/database/models/modules.model';
import { Privilege } from 'src/database/models/privileges.model';
import { privilegeRole } from 'src/database/models/privileges-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, ModuleModel, Privilege, privilegeRole]), PermissionModule],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule { }

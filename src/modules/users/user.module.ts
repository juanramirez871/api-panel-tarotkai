import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { UserController } from './user.controller';
import { Role } from 'src/database/models/roles.model';
import { PermissionModule } from '../permissions/permissions.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Role]), PermissionModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }

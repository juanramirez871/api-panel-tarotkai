import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
  ) { }


  async getAllRoles(): Promise<Role[] | null> {

    return this.roleModel.findAll()
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
const bcrypt = require('bcryptjs');

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
  ) { }


  async getAllRoles(): Promise<Role[] | null> {

    return this.roleModel.findAll()
  }
}

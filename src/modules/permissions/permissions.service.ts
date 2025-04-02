import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
import { User } from 'src/database/models/user.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User) private userModel: typeof User,
  ) { }


  async getAllRoles(): Promise<Role[] | null> {
    return this.roleModel.findAll()
  }

  async createRole(body): Promise<Role | null> {

    const existName = await this.roleModel.findOne({ where: { name: body.name } })
    if (existName) throw new Error("El nombre del rol ya esta en uso")

    return Role.create(body)
  }

  async deleteRole(id: number): Promise<number | null> {

    const inUseRole = await this.userModel.findOne({ where: { role_id: id } })
    if (inUseRole) throw new Error("El rol esta en uso, no se puede eliminar")

    const roleDelete = Role.destroy({
      where: {
        id
      }
    })

    return roleDelete
  }
}

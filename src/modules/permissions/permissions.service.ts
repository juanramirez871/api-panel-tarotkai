import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
import { User } from 'src/database/models/user.model';
import { Module } from 'src/database/models/modules.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Module) private moduleModel: typeof Module,
  ) { }


  async getAllRoles(): Promise<Role[] | null> {
    return this.roleModel.findAll()
  }

  async getAllModules() {

    const modulesWithSubmodules: any = {}
    const modules = await this.moduleModel.findAll()

    modules.forEach((el: any) => {

      const module = el.get({ plain: true })
      if (module.name.includes('_'))
      {
        const nameModule = module.name.split('_')[0]
        const nameSubModule = module.name.split('_').slice(1).join('_');
        modulesWithSubmodules[nameModule]['subModules'].push({ idSubModule: module.id ,name: nameSubModule })
      }
      else modulesWithSubmodules[module.name] = { idModule: module.id, privileges: [], subModules: [] }

    })

    return modulesWithSubmodules
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

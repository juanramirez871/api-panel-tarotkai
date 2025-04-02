import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
import { User } from 'src/database/models/user.model';
import { Module } from 'src/database/models/modules.model';
import { Privilege } from 'src/database/models/privileges.model';
import { privilegeRole } from 'src/database/models/privileges-roles.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Role) private roleModel: typeof Role,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Module) private moduleModel: typeof Module,
    @InjectModel(Privilege) private privilegeModel: typeof Privilege,
    @InjectModel(privilegeRole) private privilegeRoleModel: typeof privilegeRole,
  ) { }


  async getAllRoles(): Promise<Role[] | null> {
    return this.roleModel.findAll()
  }

  async getAllModulesWithPrivileges(idRole: number) {
    const modulesWithSubmodules: any = {};
    const modules = await this.moduleModel.findAll();
  
    for (const el of modules)
    {
      const module = el.get({ plain: true });
      const privileges = await this.privilegeModel.findAll({
        attributes: [['id', 'idPrivilege'], 'name'],
        where: { module_id: module.id }
      });
  
      const privilegesUserModule = await this.privilegeRoleModel.findAll({
        attributes: ['privilege_id', 'role_id', 'id'],
        where: { role_id: idRole }
      });
  
      const privilegesWithCheck = privileges.map(privilege => {
        const privilegePlain = privilege.get({ plain: true });

        return {
          ...privilegePlain,
          check: privilegesUserModule.some(privileUser => privileUser.dataValues.privilege_id === privilegePlain.idPrivilege)
        };
      });
  
      if (module.name.includes('_'))
      {
        const nameModule = module.name.split('_')[0];
        const nameSubModule = module.name.split('_').slice(1).join('_');
  
        if (!modulesWithSubmodules[nameModule]) modulesWithSubmodules[nameModule] = { subModules: [] };
  
        modulesWithSubmodules[nameModule]['subModules'].push({
          idSubModule: module.id,
          name: nameSubModule,
          privileges: privilegesWithCheck
        });
      }
      else
      {
        modulesWithSubmodules[module.name] = {
          idModule: module.id,
          privileges: privilegesWithCheck,
          subModules: []
        };
      }
    }
  
    return modulesWithSubmodules;
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

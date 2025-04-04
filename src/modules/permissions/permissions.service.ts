import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
import { User } from 'src/database/models/user.model';
import { Module } from 'src/database/models/modules.model';
import { Privilege } from 'src/database/models/privileges.model';
import { privilegeRole } from 'src/database/models/privileges-roles.model';
import { Op } from 'sequelize';

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

    for (const el of modules) {
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

      if (module.name.includes('_')) {
        const nameModule = module.name.split('_')[0];
        const nameSubModule = module.name.split('_').slice(1).join('_');

        if (!modulesWithSubmodules[nameModule]) modulesWithSubmodules[nameModule] = { subModules: [] };

        modulesWithSubmodules[nameModule]['subModules'].push({
          id: module.id,
          name: nameSubModule,
          privileges: privilegesWithCheck
        });
      }
      else {
        modulesWithSubmodules[module.name] = {
          idModule: module.id,
          privileges: privilegesWithCheck,
          subModules: []
        };
      }
    }

    return modulesWithSubmodules;
  }


  async createRole(body: any, userId: number): Promise<Role | null> {

    const existName = await this.roleModel.findOne({ where: { name: body.name } })
    if (existName) throw new Error("El nombre del rol ya esta en uso")

    body['created_by'] = userId
    body['updated_by'] = userId
    console.log(userId);
    return Role.create(body)
  }

  async changePrivilegeRole(idRole: number, idPrivilege: number, userId: number): Promise<boolean> {

    const existPrivilegeRole = await this.privilegeRoleModel.findOne({
      where: {
        'role_id': idRole,
        'privilege_id': idPrivilege
      }
    })

    if (existPrivilegeRole) {
      await this.privilegeRoleModel.destroy({
        where: {
          role_id: idRole,
          privilege_id: idPrivilege
        }
      });
    }
    else {
      await this.privilegeRoleModel.create({
        role_id: idRole,
        privilege_id: idPrivilege,
        created_by: userId,
        updated_by: userId
      });
    }

    return true
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

  async checkPrivilegeUserCurrent(privilegeId: number, userId: number): Promise<boolean> {

    const user = await this.userModel.findByPk(userId)
    const existPrivilege = await this.privilegeRoleModel.findOne({
      where: {
        privilege_id: privilegeId,
        role_id: user?.dataValues?.role_id
      }
    })

    if (existPrivilege) return true
    return false
  }

  async getAllModulesAvailable(userId: number): Promise<privilegeRole[] | null> {

    const user = await this.userModel.findByPk(userId)
    const modulesAvailable: any = await this.privilegeRoleModel.findAll({
      attributes: [
        [col("privilege.module.id"), "module_id"],
        [col("privilege.module.name"), "name"],
        [col("privilege.module.icon"), "icon"],
      ],
      where: {
        role_id: user?.dataValues?.role_id
      },
      include: [
        {
          model: this.privilegeModel,
          as: "privilege",
          attributes: ["name", ["id", "idPrivilege"]],
          where: {
            name: {
              [Op.like]: '%modulo%'
            }
          },
          include: [
            {
              model: this.moduleModel,
              as: "module",
              attributes: []
            }
          ]
        }
      ]
    })

    const grouped: any = []

    for (let item of modulesAvailable) {

      item = item.get({ plain: true })
      const existing = grouped.find((g: any) => g.module_id === item.module_id)

      if (existing) {
        existing.submodules.push(item.privilege)
      } else {
        grouped.push({
          module_id: item.module_id,
          name: item.name,
          icon: item.icon,
          submodules: [item.privilege]
        })
      }
    }

    return grouped
  }
}

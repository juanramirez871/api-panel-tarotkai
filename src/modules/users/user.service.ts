import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { Role } from 'src/database/models/roles.model';
import { col } from 'sequelize';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Role) private roleModel: typeof Role,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne(
      {
        attributes: ["email", "name", "extension", "password"],
        where: { email }
      });
  }

  async findByExtent(extent: string): Promise<User | null> {
    return this.userModel.findOne(
      {
        attributes: ["email", "name", "extension"],
        where: { extension: extent }
      });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id)
  }

  async getAllUsers(): Promise<User[] | null> {
    return this.userModel.findAll({
      attributes: [
        ["id", "idUser"],
        [col("role.id"), "idRole"],
        [col("role.name"), "roleName"],
        "name",
        "email",
        "extension",
        "createdAt"
      ],
      include: [
        {
          model: this.roleModel,
          as: "role",
          attributes: []
        }
      ],
      order: [["createdAt", "DESC"]]
    })
  }

  async getUserWithRolByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      attributes: [
        ["id", "idUser"],
        [col("role.id"), "idRole"],
        [col("role.name"), "roleName"],
        "name",
        "email",
        "extension",
        "createdAt"
      ],
      where: {
        email
      },
      include: [
        {
          model: this.roleModel,
          as: "role",
          attributes: []
        }
      ]
    })
  }

  async createUser(body): Promise<User | null> {

    const existEmail = await this.findByEmail(body.email)
    if (existEmail) throw new Error("Correo ya esta en uso")

    const existExtent = await this.findByExtent(body.extent)
    if (existExtent) throw new Error("La extensión ya esta en uso")

    const saltRounds = 8;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
    await this.userModel.create({
      name: body.name,
      email: body.email,
      role_id: body.rolId,
      password: hashedPassword,
      extension: body.extent
    })

    return await this.getUserWithRolByEmail(body.email)
  }

  async editUser(body, id: number): Promise<User | null> {

    const user = (await this.getUserById(id))?.get({ plain: true })
    if (!user) throw new Error("El usuario no existe")

    if (user.email != body.email) {
      const existEmail = await this.findByEmail(body.email)
      if (existEmail) throw new Error("El correo ya esta en uso")
    }

    if (user.extension != body.extent) {
      const existExtent = await this.findByExtent(body.extent)
      if (existExtent) throw new Error("La extensión ya esta en uso")
    }

    if (body.password) {
      const saltRounds = 8;
      body.password = bcrypt.hashSync(body.password, saltRounds);
    }

    await this.userModel.update(
      {
        name: body.name,
        email: body.email,
        role_id: body.rolId,
        password: body.password ?? user.password,
        extension: body.extent
      },
      {
        where: {
          id
        },
      }
    );

    return await this.getUserWithRolByEmail(body.email)
  }

  async deleteUser(id: number): Promise<number> {

    const existUser = await this.getUserById(id)
    if (!existUser) throw new Error("Usuario no existe")

    const user = await this.userModel.destroy({
      where: {
        id
      },
    });

    return user
  }

}

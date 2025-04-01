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
        attributes: ["password", "email", "name", "extension"],
        where: { email }
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
        "extension",
        "createdAt"
      ],
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
    const saltRounds = 8;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
    const user = await this.userModel.create({
      name: body.name,
      email: body.email,
      role_id: body.rolId,
      password: hashedPassword,
      extension: body.extent
    })
    return user
  }
}

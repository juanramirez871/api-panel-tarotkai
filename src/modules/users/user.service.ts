import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne(
      {
        attributes: ["password", "email"],
        where: { email }
      });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id)
  }
}

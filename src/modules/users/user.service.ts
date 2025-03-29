import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async findByUsername(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
}

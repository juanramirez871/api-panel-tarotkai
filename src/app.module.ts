import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './database/models/user.model';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { Role } from './database/models/roles.model';
import { PermissionModule } from './modules/permissions/permissions.module';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_NAME || 'db_name',
      models: [User, Role],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PermissionModule
  ],
})
export class AppModule { }

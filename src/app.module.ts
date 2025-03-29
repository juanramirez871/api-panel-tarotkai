import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
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
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule
  ],
})
export class AppModule {}

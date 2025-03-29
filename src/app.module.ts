import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_USERNAME || '127.0.0.1',
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '123',
      database: process.env.DB_HOST || 'db_name',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}

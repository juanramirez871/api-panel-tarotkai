import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeCallController } from './type-calls.controller';
import { TypeCallService } from './type-calls.service';

@Module({
  imports: [SequelizeModule.forFeature([TypeCallModule])],
  providers: [TypeCallService],
  controllers: [TypeCallController],
  exports: [TypeCallService],
})
export class TypeCallModule { }

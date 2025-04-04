import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModule } from '../permissions/permissions.module';
import { Customer } from 'src/database/models/customers.model';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';

@Module({
    imports: [SequelizeModule.forFeature([Customer]), PermissionModule],
    providers: [CustomerService],
    controllers: [CustomerController],
    exports: [CustomerService],
})
export class CustomerModule { }

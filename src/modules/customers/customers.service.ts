import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/database/models/customers.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer) private customerModel: typeof Customer,
    ) { }


}

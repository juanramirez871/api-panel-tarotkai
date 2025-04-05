import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/database/models/customers.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer) private customerModel: typeof Customer,
    ) { }

    async getAllCustomers(): Promise<Customer[] | null> {

        return this.customerModel.findAll({
            where: { delete: 0 },
            order: [["id", "DESC"]]
        })
    }

    async getCustomerByName(name: string): Promise<Customer | null> {

        return this.customerModel.findOne({
            where: {
                delete: 0,
                name
            },
        })
    }

    async getCustomerById(customerId: number): Promise<Customer | null> {

        return this.customerModel.findOne({
            where: {
                delete: 0,
                id: customerId
            },
        })
    }

    async createCustomer(body: any, userId: number): Promise<Customer | null> {

        const existName = await this.getCustomerByName(body.name)
        if (existName) throw new Error("El nombre del cliente ya esta en uso")

        const newCustomer = await this.customerModel.create({
            name: body.name,
            calls: 0,
            country: body.country,
            city: body.city,
            created_by: userId,
            updated_by: userId,
            delete: 0
        })

        console.log(newCustomer);
        return await this.getCustomerById(newCustomer.id)
    }
}

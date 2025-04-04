import { Controller, Post, Req, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { CustomerService } from './customers.service';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }


}

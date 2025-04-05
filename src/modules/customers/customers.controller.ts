import { Controller, Post, Req, UseGuards, Get, Delete, Put } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ValidatePrivilegesGuard } from 'src/guards/validate-privileges.guard';
import { PrivilegesEnum } from '../permissions/permissions.enums';
import { ApiResponse } from 'src/utils/apiResponse';
import { RequestWithUser } from '../auth/auth.interfaces';
import { ValidationGuard } from 'src/guards/validation.guard';
import { createOrEditCustomer } from './customers.chema';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    @ValidatePrivilegesGuard([PrivilegesEnum.VER_CLIENTES])
    async getAllCustomers() {
        try {
            const data = await this.customerService.getAllCustomers();
            return ApiResponse.success('Consultado correctamente', data);
        }
        catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Get('/:idCustomer')
    @UseGuards(JwtAuthGuard)
    @ValidatePrivilegesGuard([PrivilegesEnum.VER_CLIENTES])
    async getCustomer(@Req() req: RequestWithUser) {
        try {
            const data = await this.customerService.getCustomerById(req.params.idCustomer);
            return ApiResponse.success('Consultado correctamente', data);
        }
        catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    @UseGuards(new ValidationGuard(createOrEditCustomer))
    @ValidatePrivilegesGuard([PrivilegesEnum.CREAR_CLIENTES_2])
    async createCustomer(@Req() req: RequestWithUser) {
        try {
            const data = await this.customerService.createCustomer(req.body, req.user.id);
            return ApiResponse.success('Guardado correctamente', data);
        }
        catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Delete('/:idCustomer')
    @UseGuards(JwtAuthGuard)
    @ValidatePrivilegesGuard([PrivilegesEnum.ELIMINAR_CLIENTES])
    async deleteCustomer(@Req() req: RequestWithUser) {
        try {
            const data = await this.customerService.deleteCustomer(req.params.idCustomer);
            return ApiResponse.success('Eliminado correctamente', data);
        }
        catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Put('/:idCustomer')
    @UseGuards(JwtAuthGuard)
    @UseGuards(new ValidationGuard(createOrEditCustomer))
    @ValidatePrivilegesGuard([PrivilegesEnum.EDITAR_CLIENTES])
    async editCustomer(@Req() req: RequestWithUser) {
        try {
            const data = await this.customerService.editCustomer(req.params.idCustomer, req.body, req.user.id);
            return ApiResponse.success('Actualizado correctamente', data);
        }
        catch (error) {
            return ApiResponse.error(error);
        }
    }
}

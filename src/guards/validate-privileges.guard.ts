import { Injectable, CanActivate, ExecutionContext, BadRequestException, applyDecorators, UseGuards, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { PermissionService } from '../modules/permissions/permissions.service';
import { Reflector } from '@nestjs/core';

dotenv.config();

@Injectable()
export class ValidatePrivileges implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        @Inject(forwardRef(() => PermissionService))
        private readonly permissionService: PermissionService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const privilegesToValidate = this.reflector.get<number[]>('privileges', context.getHandler());
        if (!privilegesToValidate) return true;

        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('No tienes permisos para realizar esta accion');
        }

        const token = authHeader.split(' ')[1];
        let decoded: any = null;
        try {
            const secretKey: string = process.env.JWT_SECRET ?? 'secretKey';
            decoded = jwt.verify(token, secretKey);
        }
        catch {
            throw new UnauthorizedException('No tienes permisos para realizar esta accion');
        }

        for (const privilegeId of privilegesToValidate) {
            const hasPrivilege = await this.permissionService.checkPrivilegeUserCurrent(privilegeId, decoded.id);
            if (!hasPrivilege) {
                throw new BadRequestException(`No tienes permisos para realizar esta accion.`);
            }
        }

        return true;
    }
}

export function ValidatePrivilegesGuard(privileges: number[]) {
    return applyDecorators(
        (target: any, key: string, descriptor: PropertyDescriptor) => {
            Reflect.defineMetadata('privileges', privileges, descriptor.value);
        },
        UseGuards(ValidatePrivileges)
    );
}

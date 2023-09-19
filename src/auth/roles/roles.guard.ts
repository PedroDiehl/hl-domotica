import { Reflector } from '@nestjs/core';
import { Role } from './enums/Role.enum';
import { ROLES_KEY } from './roles.decorator';
import { RolePriority } from './RolePriority';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';


@Injectable()
export class RolesGuard implements CanActivate {
   constructor(
      private reflector: Reflector,
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
         context.getHandler(),
         context.getClass(),
      ]);

      if (!requiredRoles) {
         return true;
      }

      // Gets current user role
      const { user: { role: userRole } } = context.switchToHttp().getRequest();
      console.log('userRole', userRole);
      console.log(requiredRoles.some((role) => RolePriority[userRole] >= RolePriority[role]));
      // Checks if user role is higher or equal to required role to access the route
      return requiredRoles.some((role) => RolePriority[userRole] >= RolePriority[role]);
   }
}

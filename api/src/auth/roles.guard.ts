import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { URoles } from 'src/users/users.schema';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<URoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    console.log('required roles: ' + requiredRoles);
    console.log(typeof requiredRoles);
    const { user } = context.switchToHttp().getRequest();
    console.log('user role: ' + user.role);

    const allowed = requiredRoles.some((role) => user.role === role);
    if (!allowed) {
      throw new ForbiddenException(
        String(`Access to this resource is restricted to: ${requiredRoles}`),
      );
    }
    return allowed;
  }
}

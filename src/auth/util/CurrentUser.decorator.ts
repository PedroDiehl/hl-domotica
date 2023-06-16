import { User } from '../../users/entities/user.entity';
import { createParamDecorator, UnauthorizedException } from '@nestjs/common';


export interface CurrentUserOptions {
   required?: boolean
}

export const CurrentUser: () => ParameterDecorator = createParamDecorator((options: CurrentUserOptions = {}, req): User => {
   const { user } = req.args[0];

   if (options.required && !user) {
      throw new UnauthorizedException();
   }

   return user;
})

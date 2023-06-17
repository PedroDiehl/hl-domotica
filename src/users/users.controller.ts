import type { Response } from 'express';
import { UsersService } from './users.service';
import { Role } from '../auth/roles/enums/Role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt/jwtAuthGuard';
import { 
   Body,
   Controller, 
   Delete, 
   Get, 
   HttpStatus, 
   Param, 
   Patch, 
   Post, 
   Res,
   UseGuards,
   ValidationPipe 
} from '@nestjs/common';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER)
@Controller('users')
export class UsersController {

   constructor(
      private readonly usersService: UsersService,
   ) {}

   @Post('create-user')
   async createUser(@Body(new ValidationPipe()) body: CreateUserDto, @Res() res: Response) {
      try {
         const createdUser = await this.usersService.createUser(body);
         res.status(HttpStatus.CREATED).send(createdUser);
      } catch (error) {
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
   }

   @Patch('update-user/:id')
   async updateUser(@Param('id') userId: string) {}

   @Patch('update-user-role/:id')
   async updateUserRole(@Param('id') userId: string, @Body() body: any, @Res() res: Response) {

      if (!body.role || !Object.values(Role).includes(body.role)) {
         res.status(HttpStatus.BAD_REQUEST).send('Invalid role informed to update.');
         return;
      }

      const updatedUser = await this.usersService.updateUserRole(userId, body.role);

      if (!updatedUser) {
         res.status(HttpStatus.NOT_FOUND).send('No user updated.');
         return;
      }

      res.status(HttpStatus.OK).send(updatedUser);
   }

   @Delete('delete-user/:id')
   async deleteUser(@Param('id') userId: string, @Res() res: Response) {
      const deletedUser = await this.usersService.deleteUser(userId);

      if (!deletedUser) {
         res.status(HttpStatus.NOT_FOUND).send('No user deleted.');
         return;
      }

      res.status(HttpStatus.OK).send(deletedUser);
   }

   @Get('find-all')
   async findAllUsers(@Res() res: Response) {
      const allUsers = await this.usersService.findAllUsers();
      res.status(HttpStatus.OK).send(allUsers);
   }

   @Get('find-by-id/:id')
   async findUserById(@Param('id') userId: string, @Res() res: Response) {
      const user = await this.usersService.findUserById(userId);
      res.status(HttpStatus.OK).send(user);
   }
}

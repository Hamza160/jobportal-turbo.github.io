import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {LoginDto, RegisterUserDto} from './dto/user.dto';
import type {Response} from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const {email, password, role} = loginDto;

        try {
            const loginResponse = await this.userService.login(email, password, role);
            res.cookie('token', loginResponse?.token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
            });
            res.status(200).send(loginResponse);
        } catch (error) {
            console.log(error);
            res.status(error?.status || 500).json({
                success: false,
                message: error?.message || 'Internal Server Error',
            });
        }
    }

    @Get('logout')
    async logout(@Res() res: Response) {
      try{
          const result = await this.userService.logout();
          res.cookie('token', "", {
              maxAge: 0,
              httpOnly: true,
              sameSite: 'strict',
          });
          res.status(200).json(result);
      }catch(error){
          res.status(500).json({success:false,message: 'Internal Server Error'});
      }
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    console.log('registerDto', registerDto)
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('loginUserDto', loginUserDto)
    return this.userService.login(loginUserDto);
  }
}

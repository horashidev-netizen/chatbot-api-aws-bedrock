import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/customize.decorator';
import { CreateUserDto } from 'src/domains/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const validateUser = await this.authService.validateUser(signInDto.username, signInDto.password);
    if (!validateUser) {
        return {
            statusCode: 401,
            message: 'Unauthorized'
        }
    }
    return this.authService.login(validateUser);
  }

  @Public()
  @Post('register')
  async register(@Body() signUpDto: CreateUserDto) {
    if (!signUpDto.email || !signUpDto.password) {
        return {
            statusCode: 400,
            message: 'Email and password are required'
        }
    }
    const validateUser = await this.authService.validateUser(signUpDto.email, signUpDto.password);
    if (validateUser) {
        return {
            statusCode: 400,
            message: 'User already exists'
        }
    }
    return this.authService.register(signUpDto);  
  }
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
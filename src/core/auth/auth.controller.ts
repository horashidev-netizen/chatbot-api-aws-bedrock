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
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
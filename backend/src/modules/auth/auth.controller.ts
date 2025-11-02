import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  getUsers() {
    return this.authService.findAll();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';

@Controller('auth')
export class AuthenticationController {
  // Injects the AuthenticationService to use its methods
  constructor(private readonly authService: AuthenticationService) {}
  // Route handler for POST requests to '/auth/login'
  // Expects an email and password in the request body for logging in
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // Destructure email and password from the request body
    const { email, password } = body;
    // Call the login method from authService with email and password
    // Await the asynchronous operation to complete
    const result = await this.authService.login(email, password);
    // return the restul of the login operation
    return result;
  }

  // Route handler for POST requests to '/auth/register'
  // Expects an email, password, and name in the request body for registration
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string },
  ) {
    // Destructure email, password, and name from the request body
    const { email, password, name } = body;
    // Call the registerUser method from authService with email, password, and name
    // Await the asynchronous operation to complete
    const result = await this.authService.registerUser(email, password, name);
    // return the result of the registration operation
    return result;
  }
}

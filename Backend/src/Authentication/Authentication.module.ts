import { Module } from '@nestjs/common';
import { AuthenticationController } from './Authentication.controller';
import { AuthenticationService } from './Authentication.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// Defines an AuthenticationModule to organize and encapsulate all authentication-related functionalities
@Module({
  // Imports modules required by this module. JwtModule is configured with secret key and token expiration settings
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Use the secret key from environment variables for JWT signing
      signOptions: { expiresIn: '20m' }, // Set the token to expire in 60 minutes
    }),
  ],
  // Lists controllers that belong to this module. Controllers handle incoming requests and return responses to the client
  controllers: [AuthenticationController],
  // Lists providers that will be instantiated by the Nest injector and may be shared at least across this module
  providers: [
    AuthenticationService, // Provides authentication-related logic and can be injected into controllers
    PrismaService, // Provides database access functionality through Prisma ORM
    JwtStrategy, // Defines a strategy for JWT authentication, used by Passport.js under the hood
  ],
})
export class AuthenticationModule {}

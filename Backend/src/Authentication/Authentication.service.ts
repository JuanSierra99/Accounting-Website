import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registers a new user with hashed password
  async registerUser(email: string, password: string, name: string) {
    // Hashes the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      return { message: 'User registered successfully.' };
      // Checks for duplicate email error to provide a clearer message
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('A user with this email already exists.');
        }
      }
      // Fallback error for unexpected issues
      throw new InternalServerErrorException('Registration failed.');
    }
  }

  // Authenticates a user and returns a JWT if successful
  async login(email: string, password: string) {
    // Finds the user by email
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    // Verifies the password and user existence
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    // Generates a JWT payload
    const payload = { email: user.email, sub: user.id };
    // Returns the access token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

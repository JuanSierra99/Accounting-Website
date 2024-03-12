import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Configures the JWT strategy to extract the token from the authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Uses the secret for verifying the token's signature
      secretOrKey: process.env.SECRET_KEY,
      // Ensures that expired tokens are not processed
      ignoreExpiration: false,
    });
  }

  /**
   * Performs validation of the payload decoded from the JWT.
   * Must be named 'validate' as per passport's requirements.
   * Returns the user based on the payload's content.
   *
   * @param payload - the JWT payload to be validated
   * @return the validation result containing user details
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

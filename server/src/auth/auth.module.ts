import { Module } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { SessionService } from './session.service';
import { PasswordService } from 'common/password.service';
import { UserModule } from 'user/user.module';

/**
 * Auth Module
 *
 * Responsible for handling user authentication
 */
@Module({
  controllers: [AuthController],
  providers: [SessionService, JwtService, PasswordService],
  exports: [SessionService],
  imports: [UserModule],
})
export class AuthModule {}

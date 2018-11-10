import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { PasswordService } from 'common/password.service';

/**
 * User Module
 *
 * Responsible for access to user records.
 */
@Module({
  providers: [UserService, PasswordService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule {}

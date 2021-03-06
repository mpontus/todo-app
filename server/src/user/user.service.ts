import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Principal } from 'common/model/principal.model';
import { PasswordService } from 'common/password.service';
import { Profiler } from 'inspector';
import { Repository } from 'typeorm';
import { User } from 'user/model/user.model';
import { UserEntity } from './entity/user.entity';
import { CreateProfileDto } from './model/create-profile-dto.model';

/**
 * User service
 *
 * Repsonsible for storage and access to user records
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Create anonymous user
   *
   * Anonymous users need to be persisted in the database to maintain
   * foreign key constraint when using TypeORM.
   */
  public async createAnonymousUser(): Promise<User> {
    const userEntity = this.userRepository.create({
      isAnonymous: true,
    });

    await this.userRepository.save(userEntity);

    return userEntity.getUser();
  }

  /**
   * Create user profile
   *
   * Converts anonymous user to permanent user.
   */
  public async createUserProfile(
    actor: Principal,
    data: CreateProfileDto,
  ): Promise<User> {
    const userEntity = await this.userRepository.findOne(actor.id);

    if (userEntity === undefined || !userEntity.isAnonymous) {
      throw new UnauthorizedException();
    }

    Object.assign(userEntity, {
      username: data.username,
      passwordHash: this.passwordService.hash(data.password),
      isAnonymous: false,
    });

    await this.userRepository.save(userEntity);

    return userEntity.getUser();
  }

  /**
   * Find user by username
   */
  public async findByUsername(username: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({
      username,
    });

    if (userEntity === undefined) {
      return undefined;
    }

    return userEntity.getUser();
  }
}

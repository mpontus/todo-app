import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/entity/user.entity';

export const id = '90aaf329-bad5-59e3-881d-5b9c0a6832c8';
export const username = 'dodgip';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);

export const run = () =>
  getConnection().manager.save(
    UserEntity,
    getConnection().manager.create(UserEntity, {
      id,
      username,
      passwordHash,
      isAnonymous: false,
    }),
  );

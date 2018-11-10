import * as jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/entity/user.entity';

export const id = '9dc8c9df-74be-5ca0-93d6-b049e820f13f';
export const token = jwt.sign(
  { sub: id, isAnonymous: true },
  process.env.JWT_SECRET || '',
);

export const run = () =>
  getConnection().manager.save(
    UserEntity,
    getConnection().manager.create(UserEntity, {
      id,
      isAnonymous: true,
    }),
  );

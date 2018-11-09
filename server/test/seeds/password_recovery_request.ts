import * as jwt from 'jsonwebtoken';
import * as seed from './registered_user';

export const previousPassword = seed.password;

export const validToken = jwt.sign(
  { sub: seed.id },
  seed.passwordHash + process.env.JWT_SECRET,
  {
    expiresIn: 3600,
  },
);

export const expiredToken = jwt.sign(
  { sub: seed.id },
  seed.passwordHash + process.env.JWT_SECRET,
  {
    expiresIn: -3600,
  },
);

export const run = seed.run;

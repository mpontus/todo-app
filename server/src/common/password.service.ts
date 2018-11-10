import * as bcrypt from 'bcrypt';
import { ConfigService } from 'nestjs-config';
import { Injectable } from '@nestjs/common';

/**
 * Password service
 *
 * Responsible for password hashing and verification
 */
@Injectable()
export class PasswordService {
  constructor(private readonly configSerivce: ConfigService) {}

  /**
   * Hash password
   */
  public async hash(password: string) {
    return await bcrypt.hash(
      password,
      this.configSerivce.get('security.salt_rounds'),
    );
  }

  /**
   * Verify hashed password
   */
  public async verify(passwordHash: string, password: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}

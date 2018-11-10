import { User } from 'common/model/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public isAnonymous!: boolean;

  @Column('text', { nullable: true })
  public username!: string | null;

  @Column('text', { nullable: true })
  public passwordHash!: string | null;

  /**
   * Map entity field onto User model
   */
  public getUser(): User {
    return new User({
      id: this.id,
      isAnonymous: this.isAnonymous,
      username: this.username || undefined,
      passwordHash: this.passwordHash || undefined,
    });
  }
}

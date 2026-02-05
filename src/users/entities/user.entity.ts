import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  email: string;
  name: string | null;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

export class UserEntity {
  id: number;
  role: Array<UserRole>;
  username: string;
  password: string;
  email: string;
}

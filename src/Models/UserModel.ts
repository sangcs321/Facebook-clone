export interface User {
  id?: number;
  name?: string;
  avatarUrl?: string;
  email: string;
  phone?: string;
  verified?: boolean;
  address?: string;
  role?: string;
  active?: boolean;
  gender?: string;
  dateOfBirth?: string;
}

export interface User {
  id: number;
  username: string;
  given_name: string;
  profile_image: string | null;
  is_staff: boolean;
}

export interface UserUpdateBody {
  given_name: string;
  profile_image: File | null;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface RegisterBody {
  username: string;
  given_name: string;
  password: string;
  profile_image: File | null;
}

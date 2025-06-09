
interface AuthCredentials {
  credential: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  age: number;
  email: string;
  username: string;
  password: string;
  agreement: true;
}

export interface LoginFormData extends AuthCredentials {}

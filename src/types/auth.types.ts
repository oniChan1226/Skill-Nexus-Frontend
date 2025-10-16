
interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupFormData extends AuthCredentials {
  name: string;
  age: number;
  agreement: true;
}

export interface LoginFormData extends AuthCredentials {}

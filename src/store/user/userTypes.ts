import { IProductCart } from "../products/productTypes";

export interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface IAuthResponse extends IUser{
  accessToken: string
  refreshToken: string
}

export interface IAuthState{
  currentUser: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  cart: IProductCart[];
  token: string | null;
  tokenExpires: string | null;
}

export interface IStoredAuthData {
  currentUser: IUser | null;
  cart: IProductCart[];
  token: string | null;
  tokenExpires: string | null;
}

export interface IUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}


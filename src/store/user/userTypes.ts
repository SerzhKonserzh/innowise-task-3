import { IProductCart } from "../products/productTypes";

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  cart: IProductCart[];
}
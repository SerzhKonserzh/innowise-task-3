import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { clearAuthStorage, saveAuthToStorage } from './userStorage';
import { TypeRootState } from '../store';

export const userMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
  const result = next(action);

  const authActions = [
    'user/loginUser',
    'user/logoutUser',
    'user/addItemToCart', 
    'user/removeItemFromCart', 
    'user/updateCartItemQuantity', 
  ];

  if (authActions.includes(action.type)) {
    const state = store.getState().user; 

    if (state.isAuthenticated && state.token && state.currentUser) {
      saveAuthToStorage({
        currentUser: state.currentUser,
        cart: state.cart,
        token: state.token,
        tokenExpires: state.tokenExpires,
      });
    } else {
      clearAuthStorage();
    }
  }

  return result;
};
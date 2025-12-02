import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCart } from '../products/productTypes';
import { IAuthState, ILoginRequest } from './userTypes';

const initialState: IAuthState =  {
		cart: [],
    isAuthenticated: false,
		isLoading: false,
	};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if(found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity + 1} : item;
        })
      } else newCart.push({...payload, quantity: 1});

      state.cart = newCart;
    }
	}
});

export const {addItemToCart} = userSlice.actions;

export default userSlice.reducer;
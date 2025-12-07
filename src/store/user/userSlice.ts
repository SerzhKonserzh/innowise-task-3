import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCart } from '../products/productTypes';
import { IAuthState, ILoginRequest } from './userTypes';
import { useLoginUserMutation } from './userApi';

const initialState: IAuthState = {
	currentUser: null,
	cart: [],
	isAuthenticated: false,
	isLoading: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addItemToCart: (state, { payload }) => {
			let newCart = [...state.cart];
			const found = state.cart.find(({ id }) => id === payload.id);

			if (found) {
				newCart = newCart.map(item => {
					return item.id === payload.id
						? { ...item, quantity: payload.quantity || item.quantity + 1 }
						: item;
				});
			} else newCart.push({ ...payload, quantity: 1 });

			state.cart = newCart;
		},
    loginUser: (state, { payload }) => {
      state.currentUser = {...payload};
      state.isAuthenticated = true;
      state.isLoading = false;
    },
		logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
	}
});

export const { addItemToCart, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

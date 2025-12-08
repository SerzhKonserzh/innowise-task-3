import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCart } from '../products/productTypes';
import { IAuthState, ILoginRequest, IUser } from './userTypes';
import { useLoginUserMutation } from './userApi';
import { loadAuthFromStorage } from './userStorage';

const stored = loadAuthFromStorage();

const isTokenValid = (expires: string | null): boolean => {
	if (!expires) return false;
	const now = new Date().getTime();
	const expiresTime = new Date(expires).getTime();
	return now < expiresTime;
};

const getInitialState = (): IAuthState => {
	if (!stored) {
		return {
			currentUser: null,
			cart: [],
			isAuthenticated: false,
			isLoading: false,
			token: null,
			tokenExpires: null
		};
	}

	const { token, tokenExpires, currentUser, cart } = stored;

	if (token && tokenExpires && isTokenValid(tokenExpires) && currentUser) {
		return {
			currentUser,
			cart: cart || [],
			isAuthenticated: true,
			isLoading: false,
			token,
			tokenExpires
		};
	} else {
		return {
			currentUser: null,
			cart: [],
			isAuthenticated: false,
			isLoading: false,
			token: null,
			tokenExpires: null
		};
	}
};

const initialState: IAuthState = getInitialState();

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
		removeItemFromCart: (state, action) => {
			state.cart = state.cart.filter(item => item.id !== action.payload);
		},
		updateCartItemQuantity: (
			state,
			action
		) => {
			const { id, quantity } = action.payload;
			const item = state.cart.find(i => i.id === id);
			if (item && quantity > 0) {
				item.quantity = quantity;
			} else if (item) {
				state.cart = state.cart.filter(i => i.id !== id);
			}
		},
		loginUser: (state, { payload }) => {
			const { currentUser, token, tokenExpires } = payload;
			state.currentUser = currentUser;
			state.isAuthenticated = true;
			state.isLoading = false;
			state.token = token;
			state.tokenExpires = tokenExpires;
		},
		logoutUser: state => {
			state.currentUser = null;
			state.isAuthenticated = false;
			state.isLoading = false;
			state.token = null;
			state.tokenExpires = null;
		}
	}
});

export const { addItemToCart, loginUser, logoutUser, removeItemFromCart, updateCartItemQuantity } = userSlice.actions;

export default userSlice.reducer;

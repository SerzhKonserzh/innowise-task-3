import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCart } from '../products/productTypes';
import { IAuthState, ILoginRequest, IUser } from './userTypes';
import { useLoginUserMutation } from './userApi';
import { loadAuthFromStorage } from './userStorage';

const stored = loadAuthFromStorage();

// Проверяем, не истёк ли токен
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
		// Токен недействителен — очищаем
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

export const { addItemToCart, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

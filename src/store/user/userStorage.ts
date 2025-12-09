import { IStoredAuthData } from './userTypes';

const USER_KEY = 'userAuth';

export const saveAuthToStorage = (data: IStoredAuthData) => {
	try {
		localStorage.setItem(USER_KEY, JSON.stringify(data));
	} catch (e) {
		console.error('Failed to save auth data', e);
	}
};

export const loadAuthFromStorage = (): IStoredAuthData | null => {
	try {
		const item = localStorage.getItem(USER_KEY);
		return item ? JSON.parse(item) : null;
	} catch (e) {
		console.error('Failed to load auth data', e);
		return null;
	}
};

export const clearAuthStorage = () => {
	localStorage.removeItem(USER_KEY);
};

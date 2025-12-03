import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginRequest, IAuthResponse } from './userTypes';

export const userApi = createApi({
	reducerPath: 'api/user', //уникальный ключ для хранилища
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/user/' }), //базовый путь
	endpoints: build => ({
		loginUser: build.mutation<IAuthResponse, ILoginRequest>({
			query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      })
		})
	})
});

export const {useLoginUserMutation} = userApi;

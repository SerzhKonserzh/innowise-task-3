import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginRequest, IAuthResponse } from './userTypes';
import { TypeRootState } from '../store';

const BASE_URL = 'https://dummyjson.com/user/';

export const userApi = createApi({
	reducerPath: 'api/user', //уникальный ключ для хранилища
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), //базовый путь
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

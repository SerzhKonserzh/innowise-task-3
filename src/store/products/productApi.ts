import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProducts } from './productTypes';

export const productApi = createApi({
	reducerPath: 'api/products', //уникальный ключ для хранилища
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), //базовый путь
	endpoints: build => ({
		getProducts: build.query<IProducts, void>({ query: () => 'products' }), //то, что добавляется к базовому пути
		getProductItem: build.query<IProduct, number>({ query: (id) => `products/${id}`}),
		getProductsByCategory: build.query<IProducts, string>({ query: (category) => `products/category/${category}`}),
	})
});

export const {useGetProductsQuery, useGetProductItemQuery, useGetProductsByCategoryQuery} = productApi;

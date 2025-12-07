import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProducts } from './productTypes';

export const productApi = createApi({
	reducerPath: 'api/products', //уникальный ключ для хранилища
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), //базовый путь
	endpoints: build => ({
		getProducts: build.query<IProducts, void>({ query: () => 'products' }), //то, что добавляется к базовому пути
		getProductItem: build.query<IProduct, number>({ query: (id) => `products/${id}`}),
		getProductsByCategory: build.query<IProducts, string>({ query: (category) => `products/category/${category}`}),
		searchProducts: build.query<IProduct[], string>({
      query: (item) => `/products/search?q=${encodeURIComponent(item)}`,
      // Опционально: трансформируем ответ, чтобы брать только нужное
      transformResponse: (response: IProducts ) => response.products,
    }),
	})
});

export const {useGetProductsQuery, useGetProductItemQuery, useGetProductsByCategoryQuery, useSearchProductsQuery} = productApi;

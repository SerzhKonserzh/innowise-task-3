import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IProducts, IProductsParams } from './productTypes';

export const productApi = createApi({
	reducerPath: 'api/products', //уникальный ключ для хранилища
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), //базовый путь
	endpoints: build => ({
		getProducts: build.query<IProducts, void>({ query: () => 'products' }), //то, что добавляется к базовому пути
		getProductItem: build.query<IProduct, number>({ query: (id) => `products/${id}`}),
		getCategories: build.query<string[], void>({
      query: () => '/products/category-list',
    }),
		searchProducts: build.query<IProduct[], string>({
      query: (item) => `/products/search?q=${encodeURIComponent(item)}`,
      transformResponse: (response: IProducts ) => response.products,
    }),
		getProductsWithParams: build.query<IProducts, IProductsParams>({
      query: (params) => {
        const {
          skip = 0,
          limit = 12,
          sortBy,
          category,
          order = 'asc',
        } = params;

        const searchParams = new URLSearchParams();

        searchParams.append('skip', skip.toString());
        searchParams.append('limit', limit.toString());

        if (sortBy && !category) {
          searchParams.append('sortBy', sortBy);
          searchParams.append('order', order);
        }

        if (category) {
          return `/products/category/${category}?${searchParams.toString()}`;
        } else {
          return `/products?${searchParams.toString()}`;
        }
      },
	}),
	}),
	
});

export const {useGetProductsQuery, useGetCategoriesQuery ,useGetProductItemQuery, useSearchProductsQuery, useGetProductsWithParamsQuery} = productApi;

import { configureStore } from "@reduxjs/toolkit"
import { productApi } from "./products/productApi"
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    user: userSlice,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(productApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>
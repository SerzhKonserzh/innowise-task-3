import { configureStore } from "@reduxjs/toolkit"
import { productApi } from "./products/productApi"
import userSlice from './user/userSlice'
import { userApi } from "./user/userApi"

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(productApi.middleware).concat(userApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>
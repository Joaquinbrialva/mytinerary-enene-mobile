import { configureStore } from '@reduxjs/toolkit'
import citiesAPI from './citiesAPI'
import authReducer from './authSlice'

export default configureStore({
  reducer: {
    [citiesAPI.reducerPath] : citiesAPI.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(citiesAPI.middleware),
})

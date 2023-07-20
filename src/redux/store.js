import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { userSlice } from "./slices"
const expireReducer = require('redux-persist-expire');


const persistConfig = {
  key: "user",
  storage,
  transforms : [
      expireReducer('user', {
        expireSeconds: 3600,
        expiredState: null,
        autoExpire: true
      })
  ]
}

// persist user state in local storage
const persistedReducer = persistReducer(persistConfig, userSlice.reducer)

// persist side menu state in local storage

export const store = configureStore({
  reducer: {
    [userSlice.name]: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

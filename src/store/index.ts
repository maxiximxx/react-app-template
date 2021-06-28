import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import count from './count'

const app = combineReducers({ count })
const store = configureStore({ reducer: app })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

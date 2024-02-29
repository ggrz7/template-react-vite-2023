import React from "react";
import {Provider} from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from "./reducer";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


const store = configureStore({
	reducer: RootReducer
})

type ReduxProviderProps = {
	children: React.ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => (
	<Provider store={store}>
		{ children }
	</Provider>
)

export default ReduxProvider

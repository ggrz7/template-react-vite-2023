import React, { useContext } from 'react';
import { AuthContextType, AuthAction } from './actionTypes';
import {AuthContext} from "./index.tsx"; // Adjust the import path as needed

// Custom hook to access the auth state
export const useAuthState = (): AuthContextType => useContext(AuthContext).state;

// Custom hook to access the auth dispatch function
export const useAuthDispatch = (): React.Dispatch<AuthAction> => useContext(AuthContext).dispatch;

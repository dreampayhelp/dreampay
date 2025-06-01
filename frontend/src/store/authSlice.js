import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword } from '../services/api';

const authSlice = createSlice({
       name: 'auth',
       initialState: {
              isAuthenticated: false,
              token: null,
              user:"",
              isAdmin:false,
              isforgot:false,
              forgotPasswordemail:""
       },
       reducers: {
              login: (state, action) => {
                     state.isAuthenticated = true;
                     state.token = action.payload.token;
                     if(action.payload.admin){
                            state.isAdmin=true
                     }else{
                            state.isAdmin=false
                     }
              },
              forgotPasswordSlice: (state, action) => {

                     state.isforgot = true;
                     state.forgotPasswordemail = action.payload;
              },
              forgotPasswordSlicenot: (state, action) => {
                     state.isforgot = false;
                     state.forgotPasswordemail = null;
              },
              userData: (state, action) => {
                     state.user = action.payload;
              },
              logout: (state) => {
                     state.isAuthenticated = false;
                     state.token = null;
              },
       },
});

export const { login, logout ,userData,forgotPasswordSlice,forgotPasswordSlicenot} = authSlice.actions;
export default authSlice.reducer;
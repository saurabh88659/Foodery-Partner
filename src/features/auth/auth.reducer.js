import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {openCropper} from 'react-native-image-crop-picker';
import {BASE_URL} from '../commonservice';
import authService from './auth.service';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  loggedIn: false,
  Loading: false,
  userToken: null,
  currentUserData: null,
};

export const authcheckLogin = createAsyncThunk(
  'auth/checklogin',
  async (payload, thunkAPI) => {
    const res = await authService.checkLogin(payload);
    console.log('===res===========>', res);
    return res;
  },
);

export const authSlice = createSlice({
  name: 'auth/slice',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const {setLoggedIn} = authSlice.actions;
export default authSlice.reducer;

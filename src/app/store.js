import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.reducer';
import requiredataReducer from '../features/requireDataReducer/requiredata.reducer';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    requiredata: requiredataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

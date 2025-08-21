import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import routeSlice from './routeSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice,
  route: routeSlice,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage, // you can change this to sessionStorage if needed
  whitelist: ['route'], // Persist only these slices
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', // Ignore PERSIST action which contains non-serializable values like functions
          'persist/REHYDRATE', // Similarly, ignore REHYDRATE action
        ],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "./storage.js";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./authSlice";
import conversationReducer from "./conversationSlice";
import messageReducer from "./messageSlice";
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], //persist only auth and conversation
};

const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  message: messageReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

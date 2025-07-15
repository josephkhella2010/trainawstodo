import { configureStore } from "@reduxjs/toolkit";
import BookSliceReducer from "../Slices/BookSlice";

export const store = configureStore({
  reducer: {
    bookStore: BookSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

// ✅ AppDispatch type (recommended for use with `useDispatch`)
export type AppDispatch = typeof store.dispatch;

export default store;

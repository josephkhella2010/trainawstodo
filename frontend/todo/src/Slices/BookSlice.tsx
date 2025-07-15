import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookType {
  title: string;
  description: string;
  price: string;
}
interface initialStateType {
  books: BookType[];
}
const initialState: initialStateType = {
  books: [],
};
const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookType[]>) => {
      state.books = action.payload;
    },
  },
});
export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookType {
  id?: string;
  title: string;
  description: string;
  price: string;
}
interface initialStateType {
  books: BookType[];
  book: null | BookType;
}
const initialState: initialStateType = {
  books: [],
  book: null,
};
const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookType[]>) => {
      state.books = action.payload;
    },
    setBook: (state, action: PayloadAction<BookType>) => {
      state.books.push(action.payload);
    },
    setSingleBook: (state, action: PayloadAction<BookType>) => {
      state.book = action.payload;
    },
  },
});
export const { setBooks, setBook, setSingleBook } = bookSlice.actions;

export default bookSlice.reducer;

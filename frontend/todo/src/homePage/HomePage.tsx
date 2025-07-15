import { useEffect } from "react";
import { imgUrl, UrlImg } from "../ImgName";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import axios from "axios";
import { setBooks } from "../Slices/BookSlice";
import { Lia500Px } from "react-icons/lia";

export default function HomePage() {
  const books = useSelector((state: RootState) => state.bookStore.books);
  const dispatch = useDispatch();
  async function FetchBook() {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      const { books } = response.data;
      dispatch(setBooks(books));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchBook();
  }, [dispatch]);
  console.log(books);

  return (
    <div>
      <h1>TodoTable</h1>
      <form action="">
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Price" />
        <button>Submit</button>
        <div>
          <h2>Book Image</h2>
          <img
            src={UrlImg(imgUrl.fotoPathOne)}
            alt="Fruit Home"
            style={{ width: "300px", borderRadius: "8px" }}
          />
          <img
            src={UrlImg(imgUrl.fotoPathTwo)}
            alt="Fruit Home"
            style={{ width: "300px", borderRadius: "8px" }}
          />
        </div>
      </form>

      <ul>
        {books.map((item, index) => {
          return (
            <li>
              {" "}
              {index + 1}- title:{item.title} - Description:{item.description} -
              Price:{item.price} $$$$
            </li>
          );
        })}
      </ul>
    </div>
  );
}

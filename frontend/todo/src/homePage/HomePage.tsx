import { useEffect, useState } from "react";
import { imgUrl, UrlImg } from "../ImgName";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import axios from "axios";
import { setBook, setBooks, setSingleBook } from "../Slices/BookSlice";

export default function HomePage() {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    description: "",
    price: "",
  });
  const books = useSelector((state: RootState) => state.bookStore.books);
  const singleBook = useSelector((state: RootState) => state.bookStore.book);

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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addbook",
        bookInfo
      );
      const { book } = response.data;
      dispatch(setBook(book));
    } catch (error) {
      console.log(error);
    }
  }
  console.log(books);

  async function handleDelete(id: any) {
    try {
      await axios.delete(`http://localhost:5000/api/deleteBook/${id}`);
      FetchBook();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDetail(id: any) {
    try {
      const response = await axios.get(`http://localhost:5000/api/book/${id}`);
      const { book } = response.data;
      dispatch(setSingleBook(book));
    } catch (error) {
      console.log(error);
    }
  }
  console.log(singleBook);
  return (
    <div>
      <h1>TodoTable</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={bookInfo.title}
          onChange={(e) =>
            setBookInfo((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={bookInfo.description}
          onChange={(e) =>
            setBookInfo((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={bookInfo.price}
          onChange={(e) =>
            setBookInfo((prev) => ({
              ...prev,
              price: e.target.value,
            }))
          }
        />
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
            <ul key={index}>
              <li>
                {" "}
                {index + 1}- title:{item.title} - Description:{item.description}{" "}
                - Price:{item.price} $$$$
              </li>
              <button onClick={() => handleDelete(item.id)}>delete</button>
              <button onClick={() => handleDetail(item.id)}>detail</button>
            </ul>
          );
        })}
      </ul>
    </div>
  );
}

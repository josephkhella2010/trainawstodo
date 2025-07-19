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

  const [EditBookInfo, setEditBookInfo] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [IsEdit, setIsEdit] = useState<boolean>(false);
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
  // delete function
  async function handleDelete(id: any) {
    try {
      await axios.delete(`http://localhost:5000/api/deleteBook/${id}`);
      FetchBook();
    } catch (error) {
      console.log(error);
    }
  }
  // get single by id
  async function handleDetail(id: any) {
    try {
      const response = await axios.get(`http://localhost:5000/api/book/${id}`);
      const { book } = response.data;
      dispatch(setSingleBook(book));
    } catch (error) {
      console.log(error);
    }
  }
  //edit function
  function handleEdit(id: any) {
    setIsEdit(true);
    setEditingBookId(id);
    const findBook = books.find((item) => item.id === id);
    if (findBook) {
      setEditBookInfo({
        title: findBook.title,
        description: findBook.description,
        price: findBook.price,
      });
    }
  }

  // Save edited book info to backend
  async function handleSave(id: any) {
    try {
      const { title, description, price } = EditBookInfo;

      if (!title || !description || !price) {
        console.error("Missing fields in EditBookInfo");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/editBook/${id}`,
        EditBookInfo
      );

      const { updatedBook } = response.data;
      dispatch(setBook(updatedBook));

      // Refresh book list after update
      FetchBook();

      // Exit edit mode
      setIsEdit(false);
      setEditingBookId(null);
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
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </ul>
          );
        })}
      </ul>
      {IsEdit && (
        <>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (editingBookId) handleSave(editingBookId);
            }}
          >
            <input
              type="text"
              placeholder="title"
              value={EditBookInfo.title}
              onChange={(e) =>
                setEditBookInfo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="description"
              value={EditBookInfo.description}
              onChange={(e) =>
                setEditBookInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="price"
              value={EditBookInfo.price}
              onChange={(e) =>
                setEditBookInfo((prev) => ({ ...prev, price: e.target.value }))
              }
            />
            <button type="submit">save</button>
          </form>
        </>
      )}
    </div>
  );
}

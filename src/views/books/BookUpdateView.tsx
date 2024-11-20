import AppBookUpdateForm from "@/components/forms/book/AppBookUpdateForm";
import { Book } from "@/models";
import { useBookStore } from "@/stores";
import { Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookUpdateView = () => {
  const params = useParams();
  const bookStore = useBookStore();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setBook(await bookStore.retrieve(Number(params.bookId)));
      } catch (e) {
        const error = e as AxiosError;
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4">Book Update</Typography>
      {book ? (
        <AppBookUpdateForm book={book} />
      ) : (
        <Typography variant="h6">Book Not Found</Typography>
      )}
    </>
  );
};

export default BookUpdateView;

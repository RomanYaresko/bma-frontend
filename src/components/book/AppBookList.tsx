import AppBookObject from "@/components/book/AppBookObject";
import AppBookCreateForm from "@/components/forms/book/AppBookCreateForm";
import { Book } from "@/models";
import { useBookStore } from "@/stores";
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const AppBookList = () => {
  const bookStore = useBookStore();
  const [order, setOrder] = useState<string>("title");

  return (
    <>
      {bookStore.books ? (
        <>
          <Box sx={{ width: "100%" }}>
            <FormControl>
              <InputLabel id="order-select-label">Order By</InputLabel>
              <Select
                labelId="order-select-label"
                value={order}
                label="Author"
                onChange={(e) => {
                  bookStore.populate(e.target.value);
                  setOrder(e.target.value);
                }}
              >
                <MenuItem value={"title"}>By Title</MenuItem>
                <MenuItem value={"author"}>By Author</MenuItem>
                <MenuItem value={"creator"}>By Creator</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "stretch",
              alignContent: "flex-start",
              flexGrow: "1",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Card sx={{ width: 200, minHeight: 410 }}>
              <CardContent>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <AppBookCreateForm />
                </Box>
              </CardContent>
            </Card>
            {bookStore.books.map((book: Book, index: number) => (
              <AppBookObject book={book} key={index} />
            ))}
          </Box>
        </>
      ) : (
        <Alert icon={false} variant="filled" severity="error">
          <AlertTitle>Unauthorized</AlertTitle>
          Log in to access the book list
        </Alert>
      )}
    </>
  );
};

export default AppBookList;

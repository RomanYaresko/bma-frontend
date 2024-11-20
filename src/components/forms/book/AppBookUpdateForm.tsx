import { VisuallyHiddenInput } from "@/components/base/VisualHiddenInput";
import { Author, Book } from "@/models";
import { routes } from "@/router";
import { stringifyError } from "@/services";
import { useAuthorStore, useBookStore } from "@/stores";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppBookUpdateForm = (params: { book: Book }) => {
  const bookStore = useBookStore();
  const authorStore = useAuthorStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>(params.book.title);
  const [author, setAuthor] = useState<number>(params.book.author.id);
  const [cover, setCover] = useState<File | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const submitBookUpdateForm = async () => {
    try {
      await bookStore.update(
        {
          title: title,
          author: author,
          cover: cover,
        },
        params.book.id
      );
      setFormError(null);
      navigate(routes.homePage.path);
    } catch (e) {
      const error = e as AxiosError;
      setFormError(stringifyError(error));
    }
  };

  const getUploadedCover = () => {
    if (cover) {
      return (
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={URL.createObjectURL(cover)}
          alt="image"
        />
      );
    }

    return (
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={params.book.cover}
        alt="image"
      />
    );
  };

  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "1rem",
        }}
      >
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="author-select-label">Author</InputLabel>
          <Select
            labelId="author-select-label"
            value={author}
            label="Author"
            onChange={(e) => setAuthor(Number(e.target.value))}
          >
            {authorStore.authors ? (
              authorStore.authors.map((author: Author, index: number) => (
                <MenuItem key={index} value={author.id}>
                  {author.name}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
        <Box
          sx={{
            width: "100%",
            height: 200,
            padding: "10px",
            backgroundColor: "#3b3b3b",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {getUploadedCover()}
        </Box>
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload Cover
          <VisuallyHiddenInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) =>
              setCover(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        <Button
          fullWidth
          onClick={submitBookUpdateForm}
          variant="contained"
          color="success"
        >
          Update
        </Button>
      </FormControl>
      {formError ? <Alert severity="error">{formError}</Alert> : <></>}
    </>
  );
};

export default AppBookUpdateForm;

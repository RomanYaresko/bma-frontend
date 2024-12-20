import { VisuallyHiddenInput } from "@/components/base/VisualHiddenInput";
import { Author } from "@/models";
import { stringifyError } from "@/services";
import { useAuthorStore, useBookStore } from "@/stores";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
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

const AppBookCreateForm = () => {
  const bookStore = useBookStore();
  const authorStore = useAuthorStore();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<number>(
    authorStore.authors
      ? authorStore.authors[0]
        ? authorStore.authors[0].id
        : -1
      : -1
  );
  const [cover, setCover] = useState<File | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const submitBookCreateForm = async () => {
    if (cover) {
      try {
        await bookStore.create({
          title: title,
          author: author,
          cover: cover,
        });
        setFormError(null);
      } catch (e) {
        const error = e as AxiosError;
        setFormError(stringifyError(error));
      }
    } else {
      setFormError("All fields are required");
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

    return <ImageNotSupportedIcon sx={{ width: "100%", height: "100%" }} />;
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
            height: 120,
            padding: "10px",
            backgroundColor: "#3b3b3b",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {getUploadedCover()}
        </Box>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          fullWidth
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
          onClick={submitBookCreateForm}
          variant="outlined"
          color="success"
          fullWidth
        >
          Create
        </Button>
      </FormControl>
      {formError ? <Alert severity="error">{formError}</Alert> : <></>}
    </>
  );
};

export default AppBookCreateForm;

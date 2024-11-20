import { Author } from "@/models";
import { routes } from "@/router";
import { stringifyError } from "@/services";
import { useAuthorStore } from "@/stores";
import { Alert, Button, FormControl, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppAuthorUpdateForm = (params: { author: Author }) => {
  const authorStore = useAuthorStore();
  const navigate = useNavigate();

  const [name, setName] = useState<string>(params.author.name);
  const [birthDate, setBirthDate] = useState<string>(params.author.birth_date);

  const [formError, setFormError] = useState<string | null>(null);

  const submitAuthorUpdateForm = async () => {
    try {
      await authorStore.update(
        {
          name: name,
          birth_date: birthDate,
        },
        params.author.id
      );
      setFormError(null);
      navigate(routes.authorList.path);
    } catch (e) {
      const error = e as AxiosError;
      setFormError(stringifyError(error));
    }
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
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <DatePicker
          label="Controlled picker"
          value={dayjs(birthDate)}
          onChange={(newValue) => {
            if (newValue) setBirthDate(newValue.toISOString().split("T")[0]);
          }}
        />
        <Button
          fullWidth
          onClick={submitAuthorUpdateForm}
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

export default AppAuthorUpdateForm;

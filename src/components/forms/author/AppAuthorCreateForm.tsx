import { stringifyError } from "@/services";
import { useAuthorStore } from "@/stores";
import { Alert, Button, FormControl, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";

const AppAuthorCreateForm = () => {
  const authorStore = useAuthorStore();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [formError, setFormError] = useState<string | null>(null);

  const submitAuthorCreateForm = async () => {
    try {
      await authorStore.create({
        name: name,
        birth_date: birthDate,
      });
      setFormError(null);
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
          label="Title"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <DatePicker
          minDate={dayjs("1000-01-01")}
          label="Birth date"
          value={dayjs(birthDate)}
          onChange={(newValue) => {
            if (newValue) setBirthDate(newValue.toISOString().split("T")[0]);
          }}
        />
        <Button
          onClick={submitAuthorCreateForm}
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

export default AppAuthorCreateForm;

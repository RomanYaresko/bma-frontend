import { routes } from "@/router";
import { stringifyError } from "@/services";
import { useUserStore } from "@/stores";
import { Alert, Button, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisuallyHiddenInput } from "../../base/VisualHidenInput";

const AppRegisterForm = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const submitRegisterForm = async () => {
    try {
      await userStore.register({
        username: username,
        given_name: givenName,
        password: password,
        profile_image: profileImage,
      });
      setFormError(null);
      navigate(routes.homePage.path);
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
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Given Name"
          variant="outlined"
          onChange={(e) => {
            setGivenName(e.target.value);
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Upload Profile Image
          <VisuallyHiddenInput
            type="file"
            onChange={(e) =>
              setProfileImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        <Button
          fullWidth
          onClick={submitRegisterForm}
          variant="contained"
          color="success"
        >
          Register
        </Button>
      </FormControl>
      {formError ? <Alert severity="error">{formError}</Alert> : <></>}
    </>
  );
};

export default AppRegisterForm;

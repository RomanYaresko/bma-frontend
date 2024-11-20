import { VisuallyHiddenInput } from "@/components/base/VisualHidenInput";
import { routes } from "@/router";
import { stringifyError } from "@/services";
import { useUserStore } from "@/stores";
import { Alert, Button, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppUserUpdateForm = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [givenName, setGivenName] = useState<string>(
    userStore.user ? userStore.user.given_name : ""
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formError, setFormError] = useState<string | null>(null);

  const submitUserUpdateForm = async () => {
    try {
      await userStore.update({
        given_name: givenName,
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
          fullWidth
          label="Given Name"
          variant="outlined"
          value={givenName}
          onChange={(e) => {
            setGivenName(e.target.value);
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
          onClick={submitUserUpdateForm}
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

export default AppUserUpdateForm;

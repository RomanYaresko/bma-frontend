import { VisuallyHiddenInput } from "@/components/base/VisualHiddenInput";
import { routes } from "@/router";
import { stringifyError } from "@/services";
import { useUserStore } from "@/stores";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { Alert, Box, Button, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppUserUpdateForm = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [givenName, setGivenName] = useState<string>(
    userStore.user ? userStore.user.given_name : ""
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    if (userStore.user) {
      setGivenName(userStore.user.given_name);
    }
  }, [userStore.user]);

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

  const getUploadedProfileImage = () => {
    if (profileImage) {
      return (
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={URL.createObjectURL(profileImage)}
          alt="image"
        />
      );
    } else if (userStore.user && userStore.user.profile_image) {
      return (
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={userStore.user.profile_image}
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
          label="Given Name"
          variant="outlined"
          value={givenName}
          onChange={(e) => {
            setGivenName(e.target.value);
          }}
        />
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
          {getUploadedProfileImage()}
        </Box>
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
            accept=".png, .jpg, .jpeg"
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

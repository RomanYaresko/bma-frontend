import AppUserUpdateForm from "@/components/forms/user/AppUserUpdateForm";
import { Typography } from "@mui/material";

const UserUpdateView = () => {
  return (
    <>
      <Typography variant="h4">Update Current User</Typography>
      <AppUserUpdateForm />
    </>
  );
};

export default UserUpdateView;

import AppRegisterForm from "@/components/forms/user/AppRegisterForm";
import { Typography } from "@mui/material";

const RegisterView = () => {
  return (
    <>
      <Typography variant="h4">Register</Typography>
      <AppRegisterForm />
    </>
  );
};

export default RegisterView;

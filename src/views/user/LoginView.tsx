import AppLoginForm from "@/components/forms/user/AppLoginForm";
import { Typography } from "@mui/material";

const LoginView = () => {
  return (
    <>
      <Typography variant="h4">Login</Typography>
      <AppLoginForm />
    </>
  );
};

export default LoginView;

import AppAuthorObject from "@/components/author/AppAuthorObject";
import AppAuthorCreateForm from "@/components/forms/author/AppAuthorCreateForm";
import { Author } from "@/models";
import { useAuthorStore } from "@/stores";
import { Alert, AlertTitle, Box, Card, CardContent } from "@mui/material";

const AppAuthorList = () => {
  const authorStore = useAuthorStore();

  return (
    <>
      {authorStore.authors ? (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
            flexGrow: "1",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Card sx={{ width: 200, minHeight: 200 }}>
            <CardContent>
              <AppAuthorCreateForm />
            </CardContent>
          </Card>
          {authorStore.authors.map((author: Author, index: number) => (
            <AppAuthorObject author={author} key={index} />
          ))}
        </Box>
      ) : (
        <Alert icon={false} variant="filled" severity="error">
          <AlertTitle>Unauthorized</AlertTitle>
          Log in to access the author list
        </Alert>
      )}
    </>
  );
};

export default AppAuthorList;

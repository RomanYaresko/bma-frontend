import { Author } from "@/models";
import { routes } from "@/router";
import { useAuthorStore, useUserStore } from "@/stores";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const AppAuthorObject = (params: { author: Author }) => {
  const userStore = useUserStore();
  const authorStore = useAuthorStore();

  const handleAuthorDeleteOnClick = async () => {
    try {
      await authorStore.delete(params.author.id);
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
    }
  };

  return (
    <>
      <Card sx={{ width: 200, minHeight: 200 }}>
        <CardContent>
          <Typography
            sx={{
              textWrap: "nowrap",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="h6"
          >
            {params.author.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {params.author.birth_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={routes.authorUpdate.path.replace(
              ":authorId",
              params.author.id.toString()
            )}
            size="small"
            color="warning"
            disabled={userStore.user && userStore.user.is_staff ? false : true}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={handleAuthorDeleteOnClick}
            disabled={userStore.user && userStore.user.is_staff ? false : true}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AppAuthorObject;

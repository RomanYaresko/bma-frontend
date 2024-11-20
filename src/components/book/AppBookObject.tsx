import AppAvatar from "@/components/base/AppAvatar";
import { Book } from "@/models";
import { routes } from "@/router";
import { useBookStore, useUserStore } from "@/stores";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

const AppBookObject = (params: { book: Book }) => {
  const userStore = useUserStore();
  const bookStore = useBookStore();

  const handleBookDeleteOnClick = async () => {
    try {
      await bookStore.delete(params.book.id);
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
    }
  };

  return (
    <>
      <Card sx={{ width: 200, height: 410 }}>
        <CardHeader
          avatar={<AppAvatar user={params.book.creator} />}
          title={params.book.creator.given_name}
        />
        <CardMedia
          sx={{
            height: 180,
            backgroundSize: "contain",
            padding: "0.5rem",
          }}
          image={params.book.cover}
          title="book cover"
        />
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
            {params.book.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {params.book.author.name}
            <br />
            {params.book.author.birth_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={routes.bookUpdate.path.replace(
              ":bookId",
              params.book.id.toString()
            )}
            size="small"
            color="warning"
            disabled={
              userStore.user && params.book.creator.id != userStore.user.id
                ? true
                : false
            }
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={handleBookDeleteOnClick}
            disabled={
              userStore.user && params.book.creator.id != userStore.user.id
                ? true
                : false
            }
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AppBookObject;

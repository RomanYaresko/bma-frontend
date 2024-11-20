import AppAuthorUpdateForm from "@/components/forms/author/AppAuthorUpdateForm";
import { Author } from "@/models";
import { useAuthorStore } from "@/stores";
import { Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AuthorUpdateView = () => {
  const params = useParams();
  const authorStore = useAuthorStore();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthor(await authorStore.retrieve(Number(params.authorId)));
      } catch (e) {
        const error = e as AxiosError;
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4">Author Update</Typography>
      {author ? (
        <AppAuthorUpdateForm author={author} />
      ) : (
        <Typography variant="h6">Author Not Found</Typography>
      )}
    </>
  );
};

export default AuthorUpdateView;

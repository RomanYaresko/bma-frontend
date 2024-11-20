import {
  AuthorCreateBody,
  AuthorUpdateBody,
  BookCreateBody,
  BookUpdateBody,
  LoginBody,
  RegisterBody,
  UserUpdateBody,
} from "@/models";
import { apiInstance } from "@/services/api";

export const requestService = () => {
  const userRetrieveCurrent = async () => {
    return apiInstance.get(`user/current/`);
  };
  const userUpdateCurrent = async (body: UserUpdateBody) => {
    return apiInstance.put(`user/current/`, body);
  };
  const userRegister = async (body: RegisterBody) => {
    return apiInstance.post(`user/auth/register/`, body);
  };
  const userLogin = async (body: LoginBody) => {
    return apiInstance.post(`user/auth/login/`, body);
  };
  const userLogout = async () => {
    return apiInstance.post(`user/auth/logout/`);
  };

  const bookRetrieveList = async (order: string) => {
    return apiInstance.get(`api/book/`, { params: { order: order } });
  };
  const bookUpdate = async (bookUpdateBody: BookUpdateBody, bookId: number) => {
    return apiInstance.put(`api/book/${bookId}/`, bookUpdateBody);
  };
  const bookDelete = async (bookId: number) => {
    return apiInstance.delete(`api/book/${bookId}/`);
  };
  const bookCreate = async (bookCreateBody: BookCreateBody) => {
    return apiInstance.post(`api/book/`, bookCreateBody);
  };
  const bookRetrieve = async (bookId: number) => {
    return apiInstance.get(`api/book/${bookId}/`);
  };

  const authorRetrieveList = async () => {
    return apiInstance.get(`api/author/`);
  };
  const authorUpdate = async (
    authorUpdateBody: AuthorUpdateBody,
    authorId: number
  ) => {
    return apiInstance.put(`api/author/${authorId}/`, authorUpdateBody);
  };
  const authorDelete = async (authorId: number) => {
    return apiInstance.delete(`api/author/${authorId}/`);
  };
  const authorCreate = async (authorCreateBody: AuthorCreateBody) => {
    return apiInstance.post(`api/author/`, authorCreateBody);
  };
  const authorRetrieve = async (authorId: number) => {
    return apiInstance.get(`api/author/${authorId}/`);
  };

  return {
    userRetrieveCurrent,
    userUpdateCurrent,
    userRegister,
    userLogin,
    userLogout,

    bookRetrieveList,
    bookUpdate,
    bookDelete,
    bookCreate,
    bookRetrieve,

    authorRetrieveList,
    authorUpdate,
    authorDelete,
    authorCreate,
    authorRetrieve,
  };
};

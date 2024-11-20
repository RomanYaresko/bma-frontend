import AuthorListView from "@/views/author/AuthorListView";
import AuthorUpdateView from "@/views/author/AuthorUpdateView";
import BookUpdateView from "@/views/books/BookUpdateView";
import HomePageView from "@/views/books/HomePageView";
import LoginView from "@/views/user/LoginView";
import RegisterView from "@/views/user/RegisterView";
import UserUpdateView from "@/views/user/UserUpdateView";

export const routes = {
  userUpdate: { path: "/user/update", element: <UserUpdateView /> },
  login: { path: "/login", element: <LoginView /> },
  register: { path: "/register", element: <RegisterView /> },

  homePage: { path: "/", element: <HomePageView /> },
  bookUpdate: { path: "/book/:bookId", element: <BookUpdateView /> },
  authorList: { path: "/author", element: <AuthorListView /> },
  authorUpdate: { path: "/author/:authorId", element: <AuthorUpdateView /> },
};

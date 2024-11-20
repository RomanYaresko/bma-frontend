import { Author, User } from "@/models";

export interface Book {
  id: number;
  title: string;
  author: Author;
  creator: User;
  cover: string;
}

export interface BookCreateBody {
  title: string;
  author: number;
  cover: File;
}

export interface BookUpdateBody {
  title: string | null;
  author: number | null;
  cover: File | null;
}

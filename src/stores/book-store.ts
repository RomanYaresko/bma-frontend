import { Book, BookCreateBody, BookUpdateBody } from "@/models";
import { requestService } from "@/services";
import { create } from "zustand";

const useRequestService = requestService();

interface BookStore {
  books: Book[] | null;
  setBooks: (value: Book[] | null) => void;
  populate: (order?: string) => Promise<void>;
  update: (bookUpdateBody: BookUpdateBody, bookId: number) => Promise<void>;
  delete: (bookId: number) => Promise<void>;
  retrieve: (bookId: number) => Promise<Book>;
  create: (bookcreateBody: BookCreateBody) => Promise<void>;
}

const useBookStore = create<BookStore>((set, get) => ({
  books: null,

  setBooks: async (value: Book[] | null) => {
    set(() => ({ books: value }));
  },

  populate: async (order: string = "title") => {
    try {
      const response = await useRequestService.bookRetrieveList(order);
      get().setBooks(response.data as Book[]);
    } catch {
      get().setBooks(null);
    }
  },

  update: async (bookUpdateBody: BookUpdateBody, bookId: number) => {
    await useRequestService.bookUpdate(bookUpdateBody, bookId);
    await get().populate();
  },

  delete: async (bookId: number) => {
    await useRequestService.bookDelete(bookId);
    await get().populate();
  },

  retrieve: async (bookId: number) => {
    const response = await useRequestService.bookRetrieve(bookId);
    return response.data as Book;
  },

  create: async (bookCreateBody: BookCreateBody) => {
    await useRequestService.bookCreate(bookCreateBody);
    await get().populate();
  },
}));

export { useBookStore };

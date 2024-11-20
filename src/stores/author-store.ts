import { Author, AuthorCreateBody, AuthorUpdateBody } from "@/models";
import { requestService } from "@/services";
import { create } from "zustand";
import { useBookStore } from "./book-store";

const useRequestService = requestService();

interface AuthorStore {
  authors: Author[] | null;
  setAuthors: (value: Author[] | null) => void;
  populate: () => Promise<void>;
  update: (
    authorUpdateBody: AuthorUpdateBody,
    authorId: number
  ) => Promise<void>;
  delete: (authorId: number) => Promise<void>;
  retrieve: (authorId: number) => Promise<Author>;
  create: (authorcreateBody: AuthorCreateBody) => Promise<void>;
}

const useAuthorStore = create<AuthorStore>((set, get) => ({
  authors: null,

  setAuthors: async (value: Author[] | null) => {
    set(() => ({ authors: value }));
  },

  populate: async () => {
    try {
      const response = await useRequestService.authorRetrieveList();
      get().setAuthors(response.data as Author[]);
    } catch {
      get().setAuthors(null);
    }

    await useBookStore.getState().populate();
  },

  update: async (authorUpdateBody: AuthorUpdateBody, authorId: number) => {
    await useRequestService.authorUpdate(authorUpdateBody, authorId);
    await get().populate();
  },

  delete: async (authorId: number) => {
    await useRequestService.authorDelete(authorId);
    await get().populate();
  },

  retrieve: async (authorId: number) => {
    const response = await useRequestService.authorRetrieve(authorId);
    return response.data as Author;
  },

  create: async (authorCreateBody: AuthorCreateBody) => {
    await useRequestService.authorCreate(authorCreateBody);
    await get().populate();
  },
}));

export { useAuthorStore };

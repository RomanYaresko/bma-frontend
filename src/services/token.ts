import { storageInstance } from "@/services/storage";

const TOKEN_STORAGE_NAME = "token";

export const tokenService = () => {
  const set = async (token: string | null) => {
    if (token) {
      await storageInstance.setItem(TOKEN_STORAGE_NAME, token);
    } else {
      await storageInstance.removeItem(TOKEN_STORAGE_NAME);
    }
  };

  const destroy = async () => {
    await set(null);
  };

  const get = async () => {
    return storageInstance.getItem(TOKEN_STORAGE_NAME);
  };

  return {
    set,
    destroy,
    get,
  };
};

import { LoginBody, RegisterBody, User, UserUpdateBody } from "@/models";
import { requestService, tokenService } from "@/services";
import { useAuthorStore } from "@/stores";
import { create } from "zustand";

const useRequestService = requestService();
const useTokenService = tokenService();

interface UserStore {
  user: User | null;
  setUser: (value: User | null) => void;
  populate: () => Promise<void>;
  login: (loginBody: LoginBody) => Promise<void>;
  register: (registerBody: RegisterBody) => Promise<void>;
  update: (updateBody: UserUpdateBody) => Promise<void>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: (value: User | null) => {
    set(() => ({ user: value }));
  },

  populate: async () => {
    try {
      const response = await useRequestService.userRetrieveCurrent();
      get().setUser(response.data as User);
    } catch {
      if (await useTokenService.get()) {
        useTokenService.destroy();
      }

      get().setUser(null);
    }

    await useAuthorStore.getState().populate();
  },

  login: async (loginBody: LoginBody) => {
    const response = await useRequestService.userLogin(loginBody);
    const token = response.data.key;

    useTokenService.set(token);
    await get().populate();
  },

  register: async (registerBody: RegisterBody) => {
    const response = await useRequestService.userRegister(registerBody);
    const token = response.data.key;

    useTokenService.set(token);
    await get().populate();
  },

  update: async (updateBody: UserUpdateBody) => {
    await useRequestService.userUpdateCurrent(updateBody);
    await get().populate();
  },

  logout: async () => {
    await useRequestService.userLogout();
    await get().populate();
  },
}));

export { useUserStore };

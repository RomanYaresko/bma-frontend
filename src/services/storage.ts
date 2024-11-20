import { PROJECT_NAME } from "@/constants";
import localforage from "localforage";

const storageInstance = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: PROJECT_NAME,
});

export { storageInstance };

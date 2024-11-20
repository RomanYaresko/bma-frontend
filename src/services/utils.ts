import { AxiosError } from "axios";

const stringifyError = (error: AxiosError) => {
  if (error.response) {
    const errorData = error.response.data as { [key: string]: string };
    return Object.keys(errorData)
      .map((key) => `${key}: ${errorData[key]}`)
      .join(" | ");
  } else {
    return "";
  }
};

export { stringifyError };

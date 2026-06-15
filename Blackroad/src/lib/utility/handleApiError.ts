import axios from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } else {
    toast.error("Unexpected error");
  }
};

import { toast } from "sonner";

export const handleApiError = (err: unknown) => {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("Something went wrong");
  }
};

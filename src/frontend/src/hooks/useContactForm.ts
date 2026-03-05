import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useActor } from "./useActor";

export function useContactForm() {
  const { actor } = useActor();
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync: submitMessage, isPending: isSubmitting } = useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addContactMessage(name, email, message);
    },
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    },
  });

  return {
    submitMessage,
    isSubmitting,
    isSuccess,
  };
}

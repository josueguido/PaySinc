import { useEffect } from "react";
import { useErrorStore } from "@/store/useErrorStore";
import { useToast } from "@/hooks/use-toast";

export default function GlobalErrorToast() {
  const { toast } = useToast();
  const { error, clearError } = useErrorStore();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 4000,
      });
      clearError();
    }
  }, [error]);

  return null;
}

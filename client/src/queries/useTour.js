import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/api";

export function useTour(slug) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getTour(slug),

  });

  return { data, isLoading, error };
}

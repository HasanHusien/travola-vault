import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/apiTour";

export function useTour(slug) {
  // console.log(slug)
  const { data, isLoading, error } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getTour(slug),

  });

  return { data, isLoading, error };
}

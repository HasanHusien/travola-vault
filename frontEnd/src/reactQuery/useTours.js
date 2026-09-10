import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/apiTours";

export function useTours() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });
  return { data, isLoading, error };
}

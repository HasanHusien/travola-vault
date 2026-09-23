import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/api";

export function useTours() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });
  return { data, isLoading, error };
}

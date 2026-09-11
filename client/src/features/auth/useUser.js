import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
// import { useIsLoggedIn } from "../../contexts/isLoggedInContext";

export function useUser() {
  // const { isLoggedIn } = useIsLoggedIn();

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    onSuccess: () => {},
  });

  return { data, isLoading, error };
}

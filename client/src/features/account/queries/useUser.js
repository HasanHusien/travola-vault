import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/api';

export function useUser() {
  const isLoggedOut = localStorage.getItem('isLoggedIn');

  const { data:user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    // onSuccess: () => {},
  });

  return { user, isLoading, error };
}

import { useMutation, useQuery } from '@tanstack/react-query';
import { getTour as getTourApi } from '../services/api';

// export function useTour() {
//   const {
//     data,
//     isLoading,
//     mutate: getTour,
//     error,
//   } = useMutation({
//     mutationKey: ['tour'],
//     mutationFn: (slug) => getTourApi(slug),
//   });

//   return { data, getTour, isLoading, error };
// }

export function useTour(slug) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tour', slug],
    queryFn: () => getTourApi(slug),
    enabled: !!slug,
  });

  return { data, isLoading, error };
}

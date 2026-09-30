import { useMutation } from '@tanstack/react-query';
import { bookTour as bookTourApi } from '../services/api';

import { toast } from 'react-hot-toast';

export function useBookTour() {
  const { mutate: bookTour, isLoading } = useMutation({
    mutationFn: (tourId) => bookTourApi(tourId),
    mutationKey: ['card'],

    onError: () => {
      toast.error('Something went wrong, Please try again later.');
    },
  });

  return { bookTour, isLoading };
}

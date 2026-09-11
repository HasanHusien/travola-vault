import { useMutation } from '@tanstack/react-query';
import { updateUserData as updateUserDataApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUserData() {
  const {
    mutate: updateUserData,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ name, email }) => updateUserDataApi({ name, email }),

    onSuccess: () => toast.success('Data updated successfully'),
    onError: () =>
      toast.error('Sorry, Something went wrong when updating your data'),
  });

  return { updateUserData, isLoading, error };
}

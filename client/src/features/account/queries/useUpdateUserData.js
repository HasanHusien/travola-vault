import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData as updateUserDataApi } from '../../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUserData() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUserData,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateUserDataApi,

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data?.data?.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Data updated successfully');
    },
    onError: (err) =>
      toast.error(
        err.response?.data?.message ||
          'Sorry, something went wrong when updating your data',
      ),
  });

  return { updateUserData, isLoading, error };
}

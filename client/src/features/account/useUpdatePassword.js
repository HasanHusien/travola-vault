import { useMutation } from '@tanstack/react-query';
import { updateUserPassword as updateUserPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const { mutate: updatePassword } = useMutation({
    mutationFn: ({ passwordCurrent, password, passwordConfirm }) =>
      updateUserPasswordApi({ passwordCurrent, password, passwordConfirm }),
    onSuccess: () => toast.success('Password updated successfully'),
    onError: () =>
      toast.error('something went wrong, Your current password is wrong'),
  });

  return { updatePassword };
}

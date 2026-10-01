import { useMutation } from '@tanstack/react-query';
import { signup as signApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignup() {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }) =>
      signApi({ name, email, password, passwordConfirm }),
    onSuccess: () => {
      // queryClient.setQueryData(['user'], data.data.data.user);
      toast.success('Account created successfully, Now please login');
      navigate('/login', { replace: true });
      // window.location.replace("/");
    },

    onError: () => toast.error('Incorrect email or password '),
  });

  return { signup, isLoading, error };
}

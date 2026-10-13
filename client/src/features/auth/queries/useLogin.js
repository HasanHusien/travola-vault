import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [data, setData] = useState();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('logged in successfully');
      navigate('/', { replace: true });
      localStorage.removeItem('isLoggedOut');
      // setData(user);
      // console.log(user);
    },
    onError: () => {
      toast.error('Incorrect email or password ');
    },
  });

  // console.log(data);

  return { login, isLoading, error };
}

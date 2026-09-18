import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUser } from '../auth/useUser';
import { useUpdateUserData } from './useUpdateUserData';
import { userPhotoUrl } from '../../utils/userPhoto';

function UpdateData() {
  const { data: user } = useUser();
  const { register, handleSubmit, watch, reset } = useForm();
  const { updateUserData, isLoading } = useUpdateUserData();

  const selectedPhoto = watch('photo')?.[0];
  
  const previewUrl = useMemo(() => {
    if (selectedPhoto) return URL.createObjectURL(selectedPhoto);
    return userPhotoUrl(user?.photo);
  }, [selectedPhoto, user?.photo]);

  useEffect(() => {
    if (!selectedPhoto) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedPhoto, previewUrl]);

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name,
      email: user.email,
    });
  }, [user, reset]);

  function onSubmit({ name, email, photo }) {
    const newPhoto = photo?.[0];
    const nameChanged = name !== user.name;
    const emailChanged = email !== user.email;
    const photoChanged = !!newPhoto;

    if (!nameChanged && !emailChanged && !photoChanged) {
      toast.success('Everything is up to date');
      return;
    }

    const formData = new FormData();
    if (nameChanged) formData.append('name', name);
    if (emailChanged) formData.append('email', email);
    if (photoChanged) formData.append('photo', newPhoto);

    updateUserData(formData, {
      onSuccess: () => {
        reset({
          name,
          email,
          photo: undefined,
        });
      },
    });
  }

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

      <form
        className="form form-user-data"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>

          <input
            id="name"
            className="form__input"
            type="text"
            {...register('name')}
          />
        </div>

        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="email">
            Email address
          </label>

          <input
            id="email"
            className="form__input"
            type="email"
            {...register('email')}
          />
        </div>

        <div className="form__group form__photo-upload">
          <img className="form__user-photo" src={previewUrl} alt="User" />

          <input
            className="form__upload"
            type="file"
            accept="image/*"
            id="photo"
            {...register('photo')}
          />
          <label htmlFor="photo">Choose new photo</label>
        </div>

        <div className="form__group right">
          <button
            className="btn btn--small btn--green"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateData;

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../queries/useUser';
import { useUpdateUserData } from '../queries/useUpdateUserData';
import { userPhotoUrl } from '../../../utils/userPhoto';
import toast from 'react-hot-toast';

function UpdateData() {
  const { data: user } = useUser();
  const { register, handleSubmit, watch, reset } = useForm();
  const { updateUserData, isLoading } = useUpdateUserData();

  const selectedPhoto = watch('photo')?.[0];

  // using memoization for performance
  const previewUrl = useMemo(() => {
    // URL.createObjectURL() used for make URL for img %% more faster
    // blob:http://localhost:3000/8f3c2a1b-9e4d-4c7a-b2f1-6d9e8a7b5c4d
    if (selectedPhoto) return URL.createObjectURL(selectedPhoto);
    return userPhotoUrl(user?.photo);
  }, [selectedPhoto, user?.photo]);

  // removing previous URL for protect from MEMORY LEAK
  useEffect(() => {
    if (!selectedPhoto) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedPhoto, previewUrl]);

  // file form by current user data
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

    // using FormData cause there is files (photo)
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

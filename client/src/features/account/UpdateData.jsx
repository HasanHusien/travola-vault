import { useUser } from '../auth/useUser';
import { useForm } from 'react-hook-form';
import { useUpdateUserData } from './useUpdateUserData';
import toast from 'react-hot-toast';

function UpdateData() {
  const { data: user } = useUser();
  const { register, handleSubmit } = useForm();

  const { updateUserData } = useUpdateUserData();
  // console.log(user);

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

    if (nameChanged) {
      formData.append('name', name);
    }

    if (emailChanged) {
      formData.append('email', email);
    }

    if (photoChanged) {
      formData.append('photo', newPhoto);
    }

    updateUserData(formData);
  }
  // function onSubmit({ name, email, photo }) {
  //   // console.log(photo[0]?.name);
  //   // console.log(photo);

  //   if (name !== user.name || email !== user.email || photo[0] !== user.photo) {
  //     updateUserData({
  //       name: name || user.name,
  //       email: email || user.email,
  //       photo: photo[0] || user.photo,
  //     });
  //   } else {
  //     toast.success('every up to date');
  //   }
  // }

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>

      <form
        className="form form-user-data"
        onSubmit={handleSubmit(onSubmit)}
        // action="submit-user-data"
        // method="post"
      >
        <div className="form__group">
          <label className="form__label" htmlFor="name">
            Name
          </label>

          <input
            id="name"
            className="form__input"
            type="text"
            name="name"
            defaultValue={user?.name}
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
            name="email"
            defaultValue={user?.email}
            {...register('email')}
          />
        </div>

        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`/img/users/${user?.photo}`}
            alt="User"
          />

          <input
            className="form__upload"
            type="file"
            accept="image/*"
            name="photo"
            id="photo"
            {...register('photo')}
          />
          <label htmlFor="photo">Choose new photo</label>
        </div>

        <div className="form__group right">
          <button className="btn btn--small btn--green" type="submit">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateData;

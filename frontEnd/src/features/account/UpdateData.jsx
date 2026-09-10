import { useUser } from '../auth/useUser';
import { useForm } from 'react-hook-form';
import { useUpdateUserData } from './useUpdateUserData';

function UpdateData() {
  const { data: user } = useUser();
  const { register, handleSubmit } = useForm();
  const { updateUserData, isLoading } = useUpdateUserData();

  // console.log(user?.photo);
  function onSubmit({ name, email }) {
    updateUserData({
      name: name || user.name,
      email: email || user.email,
    });
  }

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
            {...register('name', { required: true })}
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
            {...register('email', { required: true })}
          />
        </div>

        <div className="form__group form__photo-upload">
          <img
            className="form__user-photo"
            src={`/img/users/${user?.photo}`}
            alt="User"
          />

          <a className="btn-text" href="#">
            Choose new photo
          </a>
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

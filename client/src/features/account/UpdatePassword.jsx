import { useForm } from 'react-hook-form';
import { useUpdatePassword } from './useUpdatePassword';

function UpdatePassword() {
  const { register, handleSubmit, reset } = useForm();
  const { updatePassword } = useUpdatePassword();

  function onSubmit({ passwordCurrent, password, passwordConfirm }) {
    updatePassword({ passwordCurrent, password, passwordConfirm });
    reset();
  }

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>

      <form
        className="form form-user-settings"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>

          <input
            id="password-current"
            className="form__input"
            type="password"
            placeholder="••••••••"
            minLength="8"
            {...register('passwordCurrent', { required: true })}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
          </label>

          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            minLength="8"
            {...register('password', { required: true })}
          />
        </div>

        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>

          <input
            id="password-confirm"
            className="form__input"
            type="password"
            placeholder="••••••••"
            minLength="8"
            {...register('passwordConfirm', { required: true })}
          />
        </div>

        <div className="form__group right">
          <button className="btn btn--small btn--green" type="submit">
            Save password
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;

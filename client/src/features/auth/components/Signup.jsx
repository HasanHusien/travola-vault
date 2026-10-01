import { useForm } from 'react-hook-form';
import { useSignup } from '../queries/useSignup';

function Signup() {
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm();

  const { signup, isLoading } = useSignup();

  function onSubmit({ name, email, password, passwordConfirm }) {
    signup({ name, email, password, passwordConfirm });
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form form--login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <label className="form__label" htmlFor="fullName">
              Full name
            </label>

            <input
              id="fullName"
              className="form__input"
              type="text"
              placeholder="Full name"
              defaultValue="ahmed ahmed"
              {...register('name', { required: true })}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              className="form__input"
              type="email"
              defaultValue="ahmed@ahmed.io"
              placeholder="you@example.com"
              {...register('email', { required: true })}
            />
          </div>

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              className="form__input"
              type="password"
              defaultValue="pass12345"
              placeholder="••••••••"
              {...register('password', { required: true, min: 8 })}
              // minLength="8"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>

            <input
              id="passwordConfirm"
              className="form__input"
              type="password"
              defaultValue="pass12345"
              placeholder="••••••••"
              {...register('passwordConfirm', { required: true, min: 8 })}
            />
          </div>

          <div className="form__group">
            <button
              className="btn btn--green"
              type="submit"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;

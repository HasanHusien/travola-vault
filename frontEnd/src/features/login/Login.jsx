import { useForm } from "react-hook-form";
import { getLogin } from "../../services/apiLogin";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  function onSubmit({ email, password }) {
    getLogin( {email, password} );
  }
  // console.log(watch("email"));

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>

        <form className="form form--login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
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
              placeholder="••••••••"
              {...register("password", { required: true })}
              // minLength="8"
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;

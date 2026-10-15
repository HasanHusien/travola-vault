import Logout from '../features/auth/components/Logout';
import { useUser } from '../features/account/queries/useUser';

function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="/">
          All tours
        </a>
      </nav>

      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>

      <nav className="nav nav--user">
        {user ? (
          <Logout />
        ) : (
          <>
            <a className="nav__el" href="/login">
              Log in
            </a>

            <a className="nav__el nav__el--cta" href="/signup">
              Sign up
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

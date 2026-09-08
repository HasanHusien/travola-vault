import Logout from '../features/auth/Logout';
import { useUser } from '../features/auth/useUser';
import { useTours } from '../react_query/useTours';
// import { useTour } from '../react_query/useTour';

function Header() {
  const { data: user, isLoading } = useUser();
  const { isLoading: isLoading2 } = useTours();

  if (isLoading2) return null;

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

            <a className="nav__el nav__el--cta" href="#">
              Sign up
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

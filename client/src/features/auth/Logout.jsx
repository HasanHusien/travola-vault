import { useLogout } from './useLogout';
import { useUser } from './useUser';
import { userPhotoUrl } from '../../utils/userPhoto';

function Logout() {
  const { data: user } = useUser();
  const { logout, isLoading } = useLogout();

  return (
    <>
      <button
        className="nav__el nav__el--logout"
        disabled={isLoading}
        onClick={logout}
      >
        Log out
      </button>

      <a className="nav__el" href="/me">
        <img
          className="nav__user-img"
          src={userPhotoUrl(user?.photo)}
          alt={`Photo of ${user?.name}`}
        />
        <span>{user?.name?.split(' ')[0]}</span>
      </a>
    </>
  );
}

export default Logout;

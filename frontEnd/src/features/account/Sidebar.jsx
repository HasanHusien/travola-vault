import { useUser } from '../auth/useUser';

function Sidebar() {
  const { user } = useUser();

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <a href="#">
            <svg>
              <use href="img/icons.svg#icon-settings" />
            </svg>
            Settings
          </a>
        </li>

        <li>
          <a href="#">
            <svg>
              <use href="img/icons.svg#icon-briefcase" />
            </svg>
            My bookings
          </a>
        </li>

        <li>
          <a href="#">
            <svg>
              <use href="img/icons.svg#icon-star" />
            </svg>
            My reviews
          </a>
        </li>

        <li>
          <a href="#">
            <svg>
              <use href="img/icons.svg#icon-credit-card" />
            </svg>
            Billing
          </a>
        </li>
      </ul>

      {user?.role === 'admin' && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>

          <ul className="side-nav">
            <li>
              <a href="#">
                <svg>
                  <use href="img/icons.svg#icon-map" />
                </svg>
                Manage tours
              </a>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use href="img/icons.svg#icon-users" />
                </svg>
                Manage users
              </a>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use href="img/icons.svg#icon-star" />
                </svg>
                Manage reviews
              </a>
            </li>

            <li>
              <a href="#">
                <svg>
                  <use href="img/icons.svg#icon-briefcase" />
                </svg>
                Manage bookings
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;

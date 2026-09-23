import Sidebar from '../features/account/components/Sidebar';
import UpdateData from '../features/account/components/UpdateData';
import UpdatePassword from '../features/account/components/UpdatePassword';

// UserSettings
function Account() {
  return (
    <main className="main">
      <div className="user-view">
        <Sidebar />

        <div className="user-view__content">
          <UpdateData />

          <div className="line">&nbsp;</div>
          <UpdatePassword />
        </div>
      </div>
    </main>
  );
}

export default Account;

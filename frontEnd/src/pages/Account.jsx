import Sidebar from "../features/account/Sidebar";
import UpdateData from "../features/account/UpdateData";
import UpdatePassword from "../features/account/UpdatePassword";


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

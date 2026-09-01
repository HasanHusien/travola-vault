import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Overview from "./pages/OverView";
import Tour from "./pages/Tour";
import Login from "./features/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

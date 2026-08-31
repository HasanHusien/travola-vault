import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/OverView";
import Tour from "./pages/Tour";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

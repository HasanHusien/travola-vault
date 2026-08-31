import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/OverView";
import Tour from "./pages/Tour";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<Overview />} />
        <Route path="/tour/:slug" element={<Tour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

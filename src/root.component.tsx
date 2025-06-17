import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./front-end/pages/buildings";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buildings" element={<Buildings />} />
      </Routes>
    </BrowserRouter>
  );
}

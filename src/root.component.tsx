import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./front-end/pages/buildings";
import NotFound from "./front-end/pages/not-found";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buildings" element={<Buildings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

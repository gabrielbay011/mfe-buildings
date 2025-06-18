import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./front-end/pages/buildings";
import NotFound from "./front-end/pages/not-found";
import BuildingProfile from "./front-end/pages/building-profile";

export default function Root(props) {
  return (
    <BrowserRouter basename="/buildings">
      <Routes>
        <Route path="/" element={<Buildings />} />
        <Route path="/profile/:id" element={<BuildingProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

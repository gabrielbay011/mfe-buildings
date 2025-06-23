import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./front-end/pages/buildings";
import NotFound from "./front-end/pages/not-found";
import BuildingProfile from "./front-end/pages/building-profile";
import BuildingFloor from "./front-end/pages/building-floor";

export default function Root(props) {
  return (
    <BrowserRouter basename="/buildings">
      <Routes>
        <Route path="/" element={<Buildings />} />
        <Route path="/profile/:id" element={<BuildingProfile />} />
        <Route path="/floor/:id" element={<BuildingFloor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

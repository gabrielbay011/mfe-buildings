import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./buildings/pages/buildings";
import NotFound from "./not-found/pages/not-found";
import BuildingProfile from "./building-profile/pages/building-profile";
import BuildingFloor from "./building-floor/pages/building-floor";
import BuildingTurnstile from "./building-turnstile/pages/building-turnstile";
import BuildingCamera from "./building-camera/pages/building-camera";
import { ApolloProvider } from "@apollo/client";
import { apolloPublicClient } from "./lib/apollo-client";

export default function Root(props) {
  return (
    <ApolloProvider client={apolloPublicClient}>
      <BrowserRouter basename="/buildings">
        <Routes>
          <Route path="/" element={<Buildings />} />
          <Route path="/profile/:id" element={<BuildingProfile />} />
          <Route path="/floor/:id" element={<BuildingFloor />} />
          <Route path="/turnstile/:id" element={<BuildingTurnstile />} />
          <Route path="/camera/:id" element={<BuildingCamera />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

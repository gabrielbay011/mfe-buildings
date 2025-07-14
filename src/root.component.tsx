import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buildings from "./buildings/pages/buildings";
import NotFound from "./not-found/pages/not-found";
import BuildingProfile from "./building-profile/pages/building-profile";
import BuildingFloor from "./building-floor/pages/building-floor";
import BuildingTurnstile from "./building-turnstile/pages/building-turnstile";
import BuildingCamera from "./building-camera/pages/building-camera";
import { ApolloProvider } from "@apollo/client";
import { apolloPublicClient } from "./lib/apollo-client";
import { PrivateRoute } from "../src/utils/auth/private-route";
import { NhostProvider } from "@nhost/react";
import { nhost } from "../src/lib/nhost";

export default function Root(props) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloPublicClient}>
        <BrowserRouter basename="/buildings">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Buildings />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <BuildingProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/floor/:id"
              element={
                <PrivateRoute>
                  <BuildingFloor />
                </PrivateRoute>
              }
            />
            <Route
              path="/turnstile/:id"
              element={
                <PrivateRoute>
                  <BuildingTurnstile />
                </PrivateRoute>
              }
            />
            <Route
              path="/camera/:id"
              element={
                <PrivateRoute>
                  <BuildingCamera />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </NhostProvider>
  );
}

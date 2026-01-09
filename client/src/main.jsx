import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./layout/Layout.jsx";
import GamePage from "./pages/GamePage/GamePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path=":room/:playerName" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
    </Layout>
  </StrictMode>
);

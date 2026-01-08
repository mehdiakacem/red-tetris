import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Routes, Route } from "react-router";
import Game from "./components/Game.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./layout/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path=":room/:playerName" element={<Game />} /> */}
      </Routes>
    </Layout>
    </BrowserRouter>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// HashRouter is used deliberately: GitHub Pages serves static files with no
// server-side rewrite rules, so a plain BrowserRouter route like /work/earth-silk
// would 404 on a hard refresh. Hash-based routes (/#/work/earth-silk) always
// resolve to index.html first, which keeps deep links and refreshes working
// under a GitHub Pages repository path.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

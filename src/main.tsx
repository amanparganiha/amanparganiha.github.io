import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Legacy HashRouter URLs (/#/blogs/x) shared before the BrowserRouter
// migration still resolve: rewrite them to path URLs before React mounts.
if (window.location.hash.startsWith("#/")) {
  window.history.replaceState(
    null,
    "",
    window.location.hash.slice(1) + window.location.search
  );
}

createRoot(document.getElementById("root")!).render(<App />);

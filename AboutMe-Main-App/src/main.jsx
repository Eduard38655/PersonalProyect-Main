import { createRoot } from "react-dom/client";
import { ThemeProvider } from "../src/Context/Theme.jsx";
import App from "./App.jsx";
import LanguageProvider from "./Context/Lenguague.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/EN-translation.json";
import es from "../locales/ES-translation.json";

// 1️⃣ Verificamos si hay un idioma guardado, si no, usamos "es"
const savedLang = localStorage.getItem("lang") || "es";

// 2️⃣ Inicializamos i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: savedLang, // idioma inicial (usa el guardado o español)
  fallbackLng: "en", // idioma de respaldo
  interpolation: {
    escapeValue: false, // React ya maneja la seguridad
  },
});

export default i18n;

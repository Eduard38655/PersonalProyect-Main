import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "../../Container_Styles/Header.module.css";
import { LanguageContext } from "../../Context/Lenguague.jsx";
import { useTheme } from "../../Context/Theme.jsx";
import DominicanFlag from "../../Flags/Rep.DomFlag.jsx";
import USAFlag from "../../Flags/USAFlag.jsx";
function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  /*Obtener el lenguage*/
  const { Lenguage, SetLenguague } = useContext(LanguageContext);

  /*Traducr informaciones con i18n*/
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    SetLenguague(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Si estás más abajo de 0px, activamos el fondo
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Ejecuta una vez para estado inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={!scrolled ? Styles.header : Styles.Onmove}>
      <div className={Styles.logo}>
        <h2>{t("MyPortfolio")}</h2>
        <ul>
          <li>
            <a href="#about">{t("about")}</a>
          </li>
          <li>
            <a href="#projects">{t("Projects")}</a>
          </li>
          <li>
            <a href="#technologies">{t("Technologies")}</a>
          </li>
          <li>
            <a href="#contact">{t("Contact")}</a>
          </li>
        </ul>
      </div>

      <div className={Styles.DivButtons_Headers}>
        <button onClick={toggleTheme}>
          {theme === "ligth" ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}
        </button>
        <button
          onClick={() => {
            Lenguage == "es" ? changeLanguage("en") : changeLanguage("es");
          }}
        >
          {Lenguage === "en" ? (
            <div>
              <DominicanFlag />
            </div>
          ) : (
            <div>
              <USAFlag />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

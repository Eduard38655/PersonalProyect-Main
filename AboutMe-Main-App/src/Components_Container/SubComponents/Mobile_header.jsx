import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "../../Container_Styles/Header.module.css";
import { LanguageContext } from "../../Context/Lenguague.jsx";
import { useTheme } from "../../Context/Theme.jsx";
import DominicanFlag from "../../Flags/Rep.DomFlag.jsx";
import USAFlag from "../../Flags/USAFlag.jsx";

function Mobile_Header(params) {
  const [isValidMenu, SetMenuValid] = useState(false);
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
    <header className={!scrolled ? Styles.Mobile_header : Styles.OnmoveMobile}>
      <div className={Styles.Mobile_logo}>
        <h2>{t("MyPortfolio")}</h2>

        <div className={Styles.Container_Info}>
          <button onClick={toggleTheme}>
            {theme === "light" ? (
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
              <div className={Styles.Div_Flag_Lenguage}>
                <DominicanFlag />
              </div>
            ) : (
              <div className={Styles.Div_Flag_Lenguage}>
                <USAFlag />
              </div>
            )}
          </button>

          {!isValidMenu ? (
            <>
              <button
                onClick={(e) => {
                  SetMenuValid(true);
                }}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  SetMenuValid(false);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </>
          )}
        </div>
      </div>
      {!isValidMenu ? (
        <></>
      ) : (
        <>
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
        </>
      )}
    </header>
  );
}
export default Mobile_Header;

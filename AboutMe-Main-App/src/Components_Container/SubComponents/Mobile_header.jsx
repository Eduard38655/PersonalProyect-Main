import { useEffect, useState } from "react";
import Styles from "../../Container_Styles/Header.module.css";
function Mobile_Header(params) {
  const [isValidMenu, SetMenuValid] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <h2>Mi Portafolio</h2>

        <div>
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
              <a href="#about">Sobre mi</a>
            </li>
            <li>
              <a href="#projects">Proyectos</a>
            </li>
            <li>
              <a href="#technologies">Tecnologías</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </>
      )}
    </header>
  );
}
export default Mobile_Header;

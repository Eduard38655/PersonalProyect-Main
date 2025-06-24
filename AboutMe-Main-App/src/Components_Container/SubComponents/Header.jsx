import { useEffect, useState } from "react";
import Styles from "../../Container_Styles/Header.module.css";

function Header() {
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
    <header
     
    className={!scrolled ? Styles.header : Styles.Onmove}>
    
      <div className={Styles.logo}>
        <h2>Mi Portafolio</h2>
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
      </div>
    </header>
  );
}

export default Header;

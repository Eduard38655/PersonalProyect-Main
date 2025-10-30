import { useState } from "react";
import { useTranslation } from "react-i18next";
import techStack from "../../../Backend-Controled/Tecnologias.js";
import Styles from "../../Container_Styles/Habilidades.module.css";
import { useTheme } from "../../Context/Theme.jsx";

function Habilidade(params) {
  const [Tecnologias, SetTecnologias] = useState(techStack);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // opcional: guardar preferencia
    localStorage.setItem("lang", lng);
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={Styles.Habilidades_Container} id="technologies">
      <h2>{t("Skills")}</h2>

      <div className={Styles.Frontend_SubContainer}>
        {Tecnologias.map((tech, index) => (
          <div key={tech.id}>
            {tech.icon.includes("fa-") ? (
              <i className={tech.icon} style={{ color: tech.style.color }}></i>
            ) : (
              <img src={tech.icon} alt={tech.name} />
            )}
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Habilidade;

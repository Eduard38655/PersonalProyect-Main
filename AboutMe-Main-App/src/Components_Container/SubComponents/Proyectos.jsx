import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import ProyectosDataBase from "../../../Backend-Controled/ProyectosDataBase.js";
import ProyectsDataBase from "../../../Backend-Controled/ProyectsDataBase.js";
import Styles from "../../Container_Styles/Proyectos.module.css";
import { LanguageContext } from "../../Context/Lenguague.jsx";
import { useTheme } from "../../Context/Theme.jsx";
function Proyectos(params) {
  const [proyectos, setProyectos] = useState([]);
const {Lenguage,SetLenguague}=useContext(LanguageContext)


useEffect(()=>{
  console.log(Lenguage);
  
  Lenguage=="es" ? setProyectos(ProyectosDataBase) : setProyectos(ProyectsDataBase)


},[Lenguage])

      const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      // opcional: guardar preferencia
      localStorage.setItem('lang', lng);
   
   
    };
    const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    setProyectos(ProyectosDataBase);
  }, []);
  return (
    <div className={Styles.Proyectos_Container} id="projects" >
      
      <h2  >{t("Project")}</h2>
       
      <div className={Styles.Proyectos_SubContainer}>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className={Styles.Proyectos_Card}>
            <img src={proyecto.imagen} alt={proyecto.titulo} />

            <div className={Styles.Proyectos_Descripcion}>
              <h3>{proyecto.titulo}</h3>
              <p className={Styles.Descripcion}>{proyecto.descripcion}</p>

              <div className={Styles.Proyectos_Tecnologias_Container}>
                {proyecto.tecnologias.map((tec, index) => (
                  <p key={index}>
                    <span className={Styles.Proyectos_Tecnologias}>{tec}</span>
                  </p>
                ))}
              </div>

              <div className={Styles.Proyectos_Botones}>
                <button className={Styles.Demo}>
                  <a
                    href={proyecto.enlace_demo}
                    target="_blank"
                    rel="#"
                  >
                    {t("SeeProyectos")}
                  </a>
                </button>

                <button className={Styles.Repositorio}>
                  <a
                    href={proyecto.enlace_codigo}
                    target="_blank"
                     rel="#"
                  >
                    <i className="fa-brands fa-github"></i> 
                     {t("Repository")}
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}

export default Proyectos;

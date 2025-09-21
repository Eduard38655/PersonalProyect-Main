import { useEffect, useState } from "react";
import ProyectosDataBase from "../../../Backend-Controled/ProyectosDataBase.js";
import Styles from "../../Container_Styles/Proyectos.module.css";

function Proyectos(params) {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    setProyectos(ProyectosDataBase);
  }, []);
  return (
    <div className={Styles.Proyectos_Container} id="projects">
      <h2>Proyectos</h2>
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
                    rel="noopener noreferrer"
                  >
                    Ver Demo
                  </a>
                </button>

                <button className={Styles.Repositorio}>
                  <a
                    href={proyecto.enlace_codigo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-github"></i> Repositorio
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

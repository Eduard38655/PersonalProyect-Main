import { Link } from "react-router-dom";
import CV from "../../../public//CV - Eduardo Ferreras - Programador Web.pdf";
import Styles from "../../Container_Styles/About_Me.module.css";
import PersonlIMG from "../../Images/Foto_Perfile_Proyect_Main.jpg";
/*Datos Personales - 2025 */
function About_Me(params) {
  return (
    <div className={Styles.About_Me_Container} id="about">
      <div className={Styles.About_Me_Text}>
        <h2>Hola, soy Eduardo Ferreras</h2>
        <br />
        <p>
          Desarrollador Full Stack, especializado en la creación de aplicaciones
          web dinámicas, intuitivas y de alto rendimiento. Mi pasión radica en
          convertir ideas complejas en soluciones digitales elegantes y
          funcionales, utilizando tecnologías modernas y mejores prácticas de
          desarrollo.
        </p>

        <br />

        <p>
          Poseo un fuerte dominio tanto del frontend como del backend.Me encanta
          enfrentar nuevos desafíos y estoy en constante aprendizaje para
          mantenerme al día con las últimas tendencias tecnológicas y ofrecer
          productos de la más alta calidad.
        </p>
        <br />
        <div className={Styles.Social_Media_Container}>
          <Link
            to="https://www.linkedin.com/notifications/?filter=all"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>

          <Link to="https://github.com/Eduard38655" target="_blank">
            <i className="fa-brands fa-github"></i>
          </Link>
        </div>
        <br />
        <div className={Styles.Buttons_Container}>
          <button>
            <a href="#projects"> Ver mis Proyectos</a>
          </button>

          <button>
            <a href={CV} download>
              <i className="fa-solid fa-download"></i> Descargar CV
            </a>
          </button>
        </div>
      </div>

      <img src={PersonlIMG} alt="" />
    </div>
  );
}

export default About_Me;

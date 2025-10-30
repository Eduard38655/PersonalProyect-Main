import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import CV from "../../../public//CV - Eduardo Ferreras - Programador Web.pdf";
import Styles from "../../Container_Styles/About_Me.module.css";
import PersonlIMG from "../../Images/Foto_Perfile_Proyect_Main.jpg";
/*Datos Personales - 2025 */
function About_Me(params) {

      const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      // opcional: guardar preferencia
      localStorage.setItem('lang', lng);
   
   
    };
  return (
    <div className={Styles.About_Me_Container} id="about">
      <img src={PersonlIMG} alt="" />
      <div className={Styles.About_Me_Text}>
        <h2> {t('greeting')} <span>{t('Hello')}</span> </h2>
        <br />
        <p>
         {t("Aboutme_Text")}
        </p>

        <br />

        <p>
    {t("Aboutme_Text2")}
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
            <a href="#projects"> {t("SeeProyectos")}</a>
          </button>

          <button>
            <a href={CV} download>
              <i className="fa-solid fa-download"></i>  {t("DownloadCV")}
            </a>
          </button>
        </div>
      </div>
       

    </div>
  );
}

export default About_Me;

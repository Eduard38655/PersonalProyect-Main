import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Styles from "../../Container_Styles/Contacto.module.css";
import ContactInputs from "./ContactInputs";

function Contacto(params) {
  const [isEmailValid, setValidEmail] = useState(false);
 const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    
    localStorage.setItem("lang", lng);

    SetLenguague(lng);
  };
  return (
    <div className={Styles.Contacto_Container} id="contact">
      <h3>{t("LetSTalk")}</h3>

      <p>
       {t("ContactForm")}
      </p>

      {isEmailValid ? (
        <>
          <button className={Styles.xmark} onClick={() => setValidEmail(false)}>
            <i className="fa-solid fa-xmark"></i>  {t("CancelEmail")}
          </button>
        </>
      ) : (
        <>
          
          <button
            className={Styles.SendEmail}
            onClick={() => setValidEmail(!isEmailValid)}
          >
            <i className="fa-solid fa-envelope"></i>  {t("SendEmail")}
          </button>
        </>
      )}

      <ContactInputs
        setValidEmail={setValidEmail}
        isEmailValid={isEmailValid}
      />

      <p className={Styles.Redes}>{t("FindMe")}</p>

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
    </div>
  );
}

export default Contacto;

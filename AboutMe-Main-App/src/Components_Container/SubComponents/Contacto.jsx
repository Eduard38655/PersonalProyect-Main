import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "../../Container_Styles/Contacto.module.css";
import ContactInputs from "./ContactInputs";

function Contacto(params) {
  const [isEmailValid, setValidEmail] = useState(false);

  return (
    <div className={Styles.Contacto_Container} id="contact">
      <h3>¡Hablemos!</h3>

      <p>
        Estoy disponible para oportunidades de freelance o roles de tiempo
        completo. Si tienes algún proyecto en mente o simplemente quieres
        saludar, no dudes en contactarme.
      </p>

      {isEmailValid ? (
        <>
          <button className={Styles.xmark} onClick={() => setValidEmail(false)}>
            <i className="fa-solid fa-xmark"></i> Cancelar Email
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            className={Styles.SendEmail}
            onClick={() => setValidEmail(!isEmailValid)}
          >
            <i className="fa-solid fa-envelope"></i> Enviame un Email
          </button>
        </>
      )}

      <ContactInputs
        setValidEmail={setValidEmail}
        isEmailValid={isEmailValid}
      />

      <p className={Styles.Redes}>También puedes encontrarme en:</p>

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

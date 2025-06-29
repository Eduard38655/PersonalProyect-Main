import { useEffect, useState } from "react";
import Styles from "../../Container_Styles/ContactoInputs.module.css";

function ContactInputs({ isEmailValid /*, setValidEmail */ }) {
  // Estados para los valores del formulario
  const [nombre, setnombre] = useState("");
  const [email, setemail] = useState("");
  const [asunto, setasunto] = useState("");
  const [mensaje, setmensaje] = useState("");
  const [errorData, seterrores] = useState([]);
  

  // Estados para los mensajes de error
  const [errnombre, seterrnombre] = useState("");
  const [erremail, seterremail] = useState("");
  const [errasunto, seterrasunto] = useState("");
  const [errmensaje, seterrmensaje] = useState("");

  // Manejo del envío del formulario
  const HandleData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/SubmitData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, asunto, mensaje })
      });
      const data = await response.json();
      seterrores(data.errors);
      console.log(data.errors);
      console.log(data.isValid);
    
      console.log(nombre, email, asunto, mensaje,"datos");
      if (data.isValid) {
      alert("Los datos han sido enviados.")
      return;
}
      
    } catch (error) {
      console.error("Error en el envío:", error);
    }
  };

  useEffect(() => {
 
    seterrnombre("");
    seterremail("");
    seterrasunto("");
    seterrmensaje("");

    errorData.forEach(errObj => {
      if (errObj.asunto) {
        seterrasunto(errObj.asunto );
      }
      if (errObj.nombre) {
        seterrnombre(errObj.nombre);
      }
      if (errObj.email) {
        seterremail(errObj.email );
      }
      if (errObj.mensaje) {
        seterrmensaje(errObj.mensaje );
      }
    });
  }, [errorData]);

  return (
    <>     
      {isEmailValid && (
        <>
          <div className={Styles.Container_Inputs}>
            <div>
              <label>Tu Nombre <span>*</span></label>
              <input
                type="text"
                placeholder="Maria Sanchez"
                onChange={(e) => setnombre(e.target.value)}
              />
              <span className={Styles.DataError}>{errnombre}</span>
            </div>

            <div>
              <label>Tu Email  <span>*</span></label>
              <input
                type="email"
                placeholder="Maria_Sanchez@ejemplo.com"
                onChange={(e) => setemail(e.target.value)}
              />
               <span className={Styles.DataError}>{erremail}</span>
            </div>

            <div>
              <label>Asunto  <span>*</span></label> 
              <input
                type="text"
                placeholder="Propuesta de Proyecto"
                onChange={(e) => setasunto(e.target.value)}
              />
              <span className={Styles.DataError}>{errasunto}</span>
            </div>

            <div className={Styles.DivTextarea}>
              <label>Mensaje  <span>*</span></label>
              <textarea
                placeholder="Hola, Me gustaría discutir..."
                onChange={(e) => setmensaje(e.target.value)}
              ></textarea>
              <span className={Styles.DataError}>{errmensaje}</span>
            </div>

            <button type="submit" onClick={HandleData} className={Styles.SubmitMessage}>
              Enviar Mensaje
            </button>
          </div>
          <p className={Styles.TextWarning}>
            <span>*</span> Campos requeridos. Al hacer clic en "Enviar Mensaje", se abrirá tu cliente de correo electrónico.
          </p>        
        </>
      )}
    </>
  );
}

export default ContactInputs;

import Styles from "../../Container_Styles/MainPage.module.css";
import About_Me from "../SubComponents/About_Me.jsx";
import Contacto from "../SubComponents/Contacto.jsx";
import Footer from "../SubComponents/Footer.jsx";
import Habilidades from "../SubComponents/Habilidades.jsx";
import Header from "../SubComponents/Header.jsx";
import Mobile_Header from "../SubComponents/Mobile_header.jsx";
import ParticlesBackground from "../SubComponents/ParticlesBackground.jsx";
import Proyectos from "../SubComponents/Proyectos.jsx";

 function HomePage(params) {
  return (
    <article className={Styles.MainPage_Container}>
                <ParticlesBackground/>
      <Header />
      <Mobile_Header />

      <div className={Styles.Sub_Commponents_Container}>
        <About_Me />
        <Habilidades />
        <Proyectos />
        <Contacto />
         
      </div>
      <Footer />
    </article>
  );
}

export default HomePage;

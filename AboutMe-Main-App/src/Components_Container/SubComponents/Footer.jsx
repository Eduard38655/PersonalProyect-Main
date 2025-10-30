import { useTranslation } from 'react-i18next';
import Styles from "../../Container_Styles/Footer.module.css";
import { useTheme } from "../../Context/Theme.jsx";

function Footer(params) {
    const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // opcional: guardar preferencia
    localStorage.setItem('lang', lng);
 
 
  };
    const { theme, toggleTheme } = useTheme();
 

  return (
    <footer>
      <div className={Styles.footerContent}>
        <p>© 2025 Eduardo Ferreras. {t("Rights")}</p>
      </div>
    </footer>
  );
}

export default Footer;


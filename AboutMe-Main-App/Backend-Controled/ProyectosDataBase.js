import AutoMundoIMG from "../src/Images/AutoMunoIMG.png";
import Intro_Form from "../src/Images/Intro_Form.png";
import Letter from "../src/Images/LetterForm.png";
import PokeAPI from "../src/Images/PokeAPI.png";

const  ProyectosDataBase = [
    {
        id:1,
        titulo: "AutoMudo",
        descripcion:"Automundo es una página web de autos desarrollada con React, HTML, CSS y PostgreSQL, con diseño moderno y responsivo. Permite buscar vehículos fácilmente mediante filtros avanzados y gestiona los datos de forma segura.",
        imagen: AutoMundoIMG,
        enlace_codigo: "https://github.com/Eduard38655/AutoMundo",
        enlace_demo: "https://eduard38655.github.io/AutoMundo/",
        tecnologias: ["HTML", "CSS", "React", "Postgres SQL"]
    },
    {
        id:2,
        titulo: "PokeAPI",
        descripcion: "Proyecto que muestra datos de Pokémon usando la PokéAPI con una interfaz interactiva.",
        imagen: PokeAPI ,
        enlace_codigo: "https://github.com/Eduard38655/PokeAPI",
        enlace_demo: "https://eduard38655.github.io/PokeAPI/",
        tecnologias: ["HTML", "CSS", "React"]
    }
    ,
    {
        id:3,
        titulo: "Newsletter-sign-up-form",
        descripcion: "Formulario de suscripción a newsletter con validación de email y mensaje de éxito al registrarse.",
        imagen: Letter,
        enlace_codigo: "https://github.com/Eduard38655/Newsletter-sign-up-form-with-success-message.",
        enlace_demo: "https://eduard38655.github.io/Newsletter-sign-up-form-with-success-message./",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    }
    ,
    {
        id:4,
        titulo: "Intro component",
        descripcion: "Componente introductorio con formulario de registro y validación de campos.",
        imagen: Intro_Form,
        enlace_codigo: "https://github.com/Eduard38655/Intro-component-with-sign-up-form",
        enlace_demo: "https://eduard38655.github.io/Intro-component-with-sign-up-form/",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    }
    
]
export default ProyectosDataBase;
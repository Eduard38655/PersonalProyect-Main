import { backend, fronted, tools } from "../../../Backend-Controled/Tecnologias.js";
import Styles from "../../Container_Styles/Habilidades.module.css";


function Habilidade(params) {
    return(<div className={Styles.Habilidades_Container} id="technologies">

<div className={Styles.Habilidades_SubContainer}>
    <h2>Habilidades</h2>


<div className={Styles.Frontend_Container}>

<div className={Styles.Frontend_SubContainer}>
{ fronted.map((tech,index) => (
    <div key={tech.id}>
        {tech.icon.includes("fa-") ? ( <i className={tech.icon} style={{color: tech.style.color}}></i>) :
         (<img src={tech.icon} alt={tech.name} />)}
        <p>{tech.name}</p>
    </div>
))}
 {backend.map((tech) => (
        <div key={tech.id}>
            {tech.icon.includes("fa-") ? ( <i className={tech.icon} style={{color: tech.style.color}}></i>) :
             (<img src={tech.icon} alt={tech.name} />)}
            <p>{tech.name}</p>
        </div>
    ))}
    {tools.map((tech) => (
        <div key={tech.id}>
            {tech.icon.includes("fa-") ? ( <i className={tech.icon} style={{color: tech.style.color}}></i>) :
             (<img src={tech.icon} alt={tech.name} />)}
            <p>{tech.name}</p>
        </div>
    ))}

</div>
 
</div>
 


 


 
 

 
 

</div>





    </div>)
}

export default Habilidade
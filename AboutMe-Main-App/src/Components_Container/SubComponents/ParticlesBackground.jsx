import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // esto ahora sí debe funcionar
import Dark from "../../../Backend-Controled/Dark_AnimationParticle.js";
import Light from "../../../Backend-Controled/Light_AnimationParticle.js";
import { useTheme } from "../../Context/Theme.jsx";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const { theme, toggleTheme } = useTheme();

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={theme == "dark" ? Dark : Light}
    />
  );
};

export default ParticlesBackground;

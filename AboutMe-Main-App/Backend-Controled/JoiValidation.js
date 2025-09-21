import Joi from "joi";
/*Joi validations */
const schema = Joi.object({
  asunto: Joi.string().min(10).required(),
  nombre: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  mensaje: Joi.string().min(20).required(),
});
const TrueData = [
  { asunto: "" },
  { nombre: "" },
  { email: "" },
  { mensaje: "" },
];

function JoiValidation(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    // Collect all error messages
    const details = error.details.map((d) => d.message);
    const NewDetails = [];

    for (const x in details) {
      if (details[x].includes("asunto")) {
        NewDetails.push({ asunto: details[x].replace('"asunto"', "Asunto") });
      } else if (details[x].includes("nombre")) {
        NewDetails.push({ nombre: details[x].replace('"nombre"', "nombre") });
      } else if (details[x].includes("email")) {
        NewDetails.push({ email: details[x].replace('"email"', "Email") });
      } else if (details[x].includes("mensaje")) {
        NewDetails.push({
          mensaje: details[x].replace('"mensaje"', "Mensaje"),
        });
      } else {
        console.log("There was an error!");
      }
    }
    return res.status(400).json({ errors: NewDetails, isValid: false });
  }
  res.status(200).json({ isValid: true, errors: TrueData });

  // If no errors, proceed
  next();
}

export default JoiValidation;

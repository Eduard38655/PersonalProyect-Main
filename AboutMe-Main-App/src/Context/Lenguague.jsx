import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [Lenguage, SetLenguague] = useState("");
  const [Run, SetRun] = useState("");

  useEffect(() => {
    const GetLocalStorage = localStorage.getItem("lang");
    SetLenguague(GetLocalStorage);
  }, []);

  useEffect(() => {
    const GetLocalStorage = localStorage.getItem("lang");
    SetLenguague(GetLocalStorage);
  }, [Lenguage]);

  return (
    <LanguageContext.Provider value={{ Lenguage, SetLenguague, Run, SetRun }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;

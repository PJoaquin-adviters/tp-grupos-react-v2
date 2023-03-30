import { Children, createContext, useState } from "react";

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [cuenta, setCuenta] = useState(null);
  const [hookToken, setHookToken] = useState(null);

  const abrirSesion = (user) => {
    setCuenta(true);
  };

  const cerrarSesion = () => {
    setCuenta(null);
  };
  const saveToken = (token) => {
    setHookToken(token);
  }

  return (
    <LoginContext.Provider value={{ cuenta, cerrarSesion, abrirSesion, hookToken, saveToken }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

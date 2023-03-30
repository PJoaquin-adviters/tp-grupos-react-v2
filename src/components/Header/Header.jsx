import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../../context/LoginContext";
import "./Header.css";
const Header = () => {
  const { cuenta, cerrarSesion } = useContext(LoginContext);

  const handleClick = () => {
    cerrarSesion();
  };

  return (
    <header>

      <h1>GRUPO 3</h1>


      {cuenta && (
        <nav>
          <ul>
            <Link to="/grupos">
              <li>GRUPOS</li>
            </Link>
            <Link to="/">
              <li className="btn-sign-out" onClick={() => handleClick()}>
                SIGN OUT
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

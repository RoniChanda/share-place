import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import classes from "./NavLinks.module.css";

function NavLinks() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          ALL USERS
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            to={`/${authCtx.userId}/places`}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            to="/places/new"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;

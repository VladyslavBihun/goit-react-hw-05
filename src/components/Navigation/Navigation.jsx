import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const createClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={createClassName}>
          Home
        </NavLink>
        <NavLink to="/movies" className={createClassName}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;

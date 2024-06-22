import clsx from "clsx";
import { NavLink, Route, Routes } from "react-router-dom";
import css from "./Navigation.module.css";
import HomePage from "../../pages/HomePage/HomePage";

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

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default Navigation;

import React from "react";

import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Категорії</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink to={`/categories/${1}`}>link</NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.footer}></div>
    </section>
  );
};

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Header.module.css";
import { ROUTES } from '../../utils/routes';

import LOGO from '../../images/logo6.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Link to={ROUTES.HOME}>
            <img src={LOGO} alt="Souvenir" />
          </Link>
        </div>

        <Link to={ROUTES.CART} className={styles.cart}>
          Зв'язатись з нами
        </Link>
      </div>

      <div className={styles.info}>

      </div>
    </div>
  );
};

export default Header;

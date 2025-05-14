import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Header.module.css";
import { ROUTES } from '../../utils/routes';

import LOGO from '../../images/logo6.png';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as CartIcon } from '../../images/shops.svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Souvenir" />
        </Link>
      </div>

      <div className={styles.info}>
        <form className={styles.form}>
          <div className={styles.icon}>
            <SearchIcon className={styles['icon-img']} />
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Пошук товарів"
              autoComplete="off"
              onChange={() => {}}
              value=""
            />
          </div>
          {false && <div className={styles.box}></div>}
        </form>

        <Link to={ROUTES.CART} className={styles.cart}>
          <CartIcon className={styles['icon-cart']} />
          <span className={styles.count}>2</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import styles from "../../styles/Cart.module.css";

const Cart = () => {
  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Контактні дані</h2>

      <div className={styles.contactInfo}>
        <p>
          <strong>Номер телефону:</strong>{" "}
          <a href="tel:+380673814897">+380673814897</a> 
          <br/>
          <strong>Вайбер:</strong>{" "}
          <a href="tel:+380673814897">+380673814897</a> 
        </p>

        <p>
          <strong>Адреса:</strong>
        </p>
        <address>
          Вулиця Замкова, 1<br />
          м. Кам’янець-Подільський<br />
          Хмельницька область<br />
          Україна
        </address>

        <p>
          <strong>Google Maps:</strong>{" "}
          <a
            href="https://maps.app.goo.gl/HDXcxPoTm9deSs8TA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Переглянути на карті
          </a>
        </p>
      </div>
    </section>
  );
};

export default Cart;

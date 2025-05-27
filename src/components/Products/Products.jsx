import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Products.module.css";

const Products = ({ title, style = {}, products = [], categories = [] }) => {
  const [visibleAmount, setVisibleAmount] = useState(5);

  // Перевіряємо, чи products — масив
  const list = Array.isArray(products) ? products.slice(0, visibleAmount) : [];

  const showMore = () => {
    setVisibleAmount((prev) => prev + 5);
  };

  if (!list.length) {
    return (
      <section className={styles.products} style={style}>
        {title && <h2>{title}</h2>}
        <p style={{ color: "#aaa", textAlign: "center" }}>No products found.</p>
      </section>
    );
  }

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}

      <div className={styles.list}>
        {list.map(({ _id, image, title, description, categoryId, price }) => {
          return (
            <Link to={`/products/${_id}`} key={_id} className={styles.product}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: image ? `url(${image})` : "none",
                }}
              />

              <div className={styles.wrapper}>
                <h3 className={styles.title}>{title}</h3>

                <div className={styles.description}>
                  {description && description.trim() !== "" ? description : "—"}
                </div>

                <div className={styles.info}>
                  <div className={styles.prices}>
                    <div className={styles.price}>{price}₴</div>
                    <div className={styles.oldPrice}>
                      {Math.floor(price * 1.2)}₴
                    </div>
                  </div>
                  {/* Можна додати purchases */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {visibleAmount < products.length && (
        <div className={styles.button}>
          <button onClick={showMore}>Показати ще</button>
        </div>
      )}
    </section>
  );
};

export default Products;

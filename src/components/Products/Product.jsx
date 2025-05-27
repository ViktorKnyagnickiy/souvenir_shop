import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Product.module.css";



const Product = (item) => {
  const { title, price, image, description } = item;
  const images = image ? [image] : [];



  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          {/* <button onClick={addToCart} className={styles.add}>
            В корзину
          </button> */}
        </div>

        <div className={styles.bottom}>
          

          <Link to={ROUTES.HOME}>Повернутись до магазину</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;

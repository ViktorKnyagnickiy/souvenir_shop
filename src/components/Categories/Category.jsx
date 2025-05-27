import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

const Category = () => {
  const { id } = useParams();
  const { list: categoryList } = useSelector((state) => state.categories);

  const [params, setParams] = useState({
    categoryId: String(id),
  });

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState({
    title: "",
    price_min: 0,
    price_max: 0,
  });

  const { data = [], isLoading } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setParams({ categoryId: String(id) });
    setItems([]);
  }, [id]);

  useEffect(() => {
    if (!id || !categoryList.length) return;

    const foundCategory = categoryList.find(
      (c) => c.id.toString() === id.toString()
    );
    setCategory(foundCategory || null);
  }, [id, categoryList]);

  useEffect(() => {
    let filtered = data;

    if (values.title) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(values.title.toLowerCase())
      );
    }

    if (values.price_min) {
      filtered = filtered.filter((item) => item.price >= values.price_min);
    }

    if (values.price_max) {
      filtered = filtered.filter((item) => item.price <= values.price_max);
    }

    setItems(filtered);
  }, [data, values]);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setValues({
      title: "",
      price_min: 0,
      price_max: 0,
    });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{category?.name || "Категорія"}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Пошук за назвою"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Ціна від</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Ціна до</span>
        </div>
        <button type="submit" hidden />
        <button type="button" onClick={handleReset}>
          Очистити фільтри
        </button>
      </form>

      {/* Додаємо id для скролу */}
      <div id="products-section">
        {isLoading && items.length === 0 ? (
          <div className="preloader">Завантаження...</div>
        ) : items.length === 0 ? (
          <div className={styles.back}>Нічого не знайдено</div>
        ) : (
          <Products title="" products={items} style={{ padding: 15 }} />
        )}
      </div>
    </section>
  );
};

export default Category;

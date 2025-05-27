import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts, filterByPrice } from "../../features/products/productsSlice";
import { getCategories } from "../../features/categories/categoriesSlice";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";

const Home = () => {
  const dispatch = useDispatch();

  const {
    products: { list, filtered, isLoading: productsLoading },
    categories: { list: categoriesList, isLoading: categoriesLoading },
  } = useSelector((state) => state);

  // Завантаження продуктів
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Завантаження категорій
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Фільтрація
  useEffect(() => {
    if (list.length) {
      dispatch(filterByPrice(100));
    }
  }, [dispatch, list.length]);

  if (productsLoading || categoriesLoading) {
    return <section className="preloader">Завантаження...</section>;
  }

  return (
    <>
      <Poster />
      <Products
        title="Популярне"
        products={list}
        categories={categoriesList}
        amount={5}
      />
      <Categories
        title="Категорії"
        products={categoriesList}
        amount={5}
      />
      {/* <Products
        title="Less than 100₴"
        products={filtered}
        categories={categoriesList}
        amount={5}
      /> */}
    </>
  );
};

export default Home;

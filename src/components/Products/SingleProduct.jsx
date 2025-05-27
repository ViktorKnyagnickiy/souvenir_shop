import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getProducts, getRelatedProducts } from "../../features/products/productsSlice";

import { ROUTES } from "../../utils/routes";

import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  // ✅ Гарантуємо, що список продуктів буде
  useEffect(() => {
    if (!list.length) {
      dispatch(getProducts());
    }
  }, [dispatch, list.length]);

  // ✅ Запит схожих товарів
  useEffect(() => {
    if (data?.categoryId && list.length) {
      dispatch(getRelatedProducts(data.categoryId));
    }
  }, [data, dispatch, list.length]);

  if (isLoading || isFetching) {
    return <section className="preloader">Loading...</section>;
  }

  if (!isSuccess || !data) {
    return (
      <section className="error">
        <h2>Product not found</h2>
        <button onClick={() => navigate(ROUTES.HOME)}>Back to store</button>
      </section>
    );
  }

  return (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Схожі товари" />
    </>
  );
};

export default SingleProduct;

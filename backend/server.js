import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Product from "./models/Product.js";
import Category from "./models/Category.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🟩 Отримати всі продукти або фільтрувати за категорією
app.get("/api/products", async (req, res) => {
  try {
    const { categoryId } = req.query;

    let query = {};
    if (categoryId) {
      query.categoryId = Number(categoryId); // Перетворюємо у число
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟩 Отримати один продукт за його ID (з перевіркою ObjectId)
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  // Перевіряємо чи це коректний ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Некоректний формат ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Продукт не знайдено" });
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟩 Отримати всі категорії
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟩 Підключення до MongoDB і запуск сервера
mongoose
  .connect("mongodb://127.0.0.1:27017/souvenir_shop")
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(3001, () => console.log("Server listening on port 3001"));
  })
  .catch((err) => console.log(err));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Product from "./models/Product.js";
import Category from "./models/Category.js";

// 🔐 Завантаження .env
dotenv.config();

// 🛠️ Змінні середовища
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// 📦 Ініціалізація застосунку
const app = express();
app.use(cors());
app.use(express.json());

// 🔄 Отримати всі продукти (опційно з фільтрацією за категорією)
app.get("/api/products", async (req, res) => {
  try {
    const { categoryId } = req.query;

    let query = {};
    if (categoryId) {
      query.categoryId = Number(categoryId);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔄 Отримати продукт за ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

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

// 🔄 Отримати всі категорії
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔌 Підключення до бази даних та запуск сервера
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected!");
    app.listen(PORT, () =>
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

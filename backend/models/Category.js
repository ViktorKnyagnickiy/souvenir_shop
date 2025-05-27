import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: Number,         // Наприклад, 1, 2, 3
  name: String,       // Назва категорії
  image: String,      // URL для зображення (не обов'язково)
});

export default mongoose.model("Category", categorySchema);

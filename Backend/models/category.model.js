import connectDB from "../config/db.js";

export const createCategory = (name, cb) => {
  connectDB.query(
    "INSERT INTO categories (category_name) VALUES (?)",
    [name],
    cb,
  );
};

export const getCategories = (cb) => {
  connectDB.query("SELECT * FROM categories", cb);
};

export const getCategoryById = (id, cb) => {
  connectDB.query("SELECT * FROM categories WHERE id = ?", [id], cb);
};

export const updateCategory = (id, name, cb) => {
  connectDB.query(
    "UPDATE categories SET category_name = ? WHERE id = ?",
    [name, id],
    cb,
  );
};

export const deleteCategory = (id, cb) => {
  connectDB.query("DELETE FROM categories WHERE id = ?", [id], cb);
};

export const checkCategoryExist = (id, cb) => {
  connectDB.query("SELECT id FROM categories WHERE id = ?", [id], cb);
};

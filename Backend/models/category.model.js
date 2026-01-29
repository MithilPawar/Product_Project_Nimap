import pool from "../config/db.js";

export const createCategory = async (name) => {
  const [result] = await pool.execute(
    "INSERT INTO categories (category_name) VALUES (?)",
    [name],
  );
  return result;
};

export const getCategories = async () => {
  const [rows] = await pool.execute("SELECT * FROM categories");
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM categories WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

export const updateCategory = async (id, name) => {
  const [result] = await pool.execute(
    "UPDATE categories SET category_name = ? WHERE id = ?",
    [name, id],
  );
  return result;
};

export const deleteCategory = async (id) => {
  const [result] = await pool.execute("DELETE FROM categories WHERE id = ?", [
    id,
  ]);
  return result;
};

export const checkCategoryExist = async (id) => {
  const [rows] = await pool.execute("SELECT id FROM categories WHERE id = ?", [
    id,
  ]);
  return rows.length > 0;
};

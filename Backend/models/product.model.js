import pool from "../config/db.js";

export const createProduct = async (name, categoryId) => {
  const [result] = await pool.execute(
    "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
    [name, categoryId],
  );
  return result;
};

export const getProductsFromDB = async (limit, offset) => {
  const dataQuery = `SELECT p.id AS ProductId,
    p.product_name AS ProductName,
    c.id AS CategoryId,
    c.category_name AS CategoryName
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LIMIT ${limit} OFFSET ${offset}`;

  const countQuery = `SELECT COUNT(*) AS total FROM products`;

  const [rows] = await pool.execute(dataQuery);
  const [countRows] = await pool.execute(countQuery);

  return {
    products: rows,
    total: countRows[0].total,
  };
};

export const getProductById = async (id) => {
  const query = `SELECT p.id AS ProductId,
    p.product_name AS ProductName,
    c.id AS CategoryId,
    c.category_name AS CategoryName
    FROM products p
    JOIN categories c
    ON p.category_id = c.id
    WHERE p.id = ?`;
  const [rows] = await pool.execute(query, [id]);
  return rows[0];
};

export const updateProduct = async (id, name, categoryId) => {
  const [result] = await pool.execute(
    "UPDATE products SET product_name = ?, category_id = ? WHERE id = ?",
    [name, categoryId, id],
  );
  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [
    id,
  ]);
  return result;
};

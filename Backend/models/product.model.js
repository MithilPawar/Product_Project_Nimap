import connectDB from "../config/db";

export const createProduct = (name, categoryId, cb) => {
  connectDB.query(
    "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
    [name, categoryId],
    cb,
  );
};

export const getProducts = (cb) => {
  const query = `SELECT p.id AS ProductId,
    p.product_name AS ProductName,
    c.id AS CategoryId,
    c.category_name AS CategoryName
    FROM products p
    JOIN categories c
    ON p.category_id = c.id
    LIMIT ? OFFSET ?`;

  connectDB.query(query, [limit, offset], cb);
};

export const updateProduct = (id, name, categoryId, cb) => {
  connectDB.query(
    "UPDATE products SET product_name = ?, category_id = ? WHERE id = ?",
    [name, categoryId, id],
    cb,
  );
};

export const delteProduct = (id, cb) => {
  connectDB.query("DELETE FROM products WHERE id = ?", [id], cb);
};

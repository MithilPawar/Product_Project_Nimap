import express from "express";
import { fetchProducts } from "../services/product.service.js";
import { getCategories as getCategoriesModel } from "../models/category.model.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "../models/category.model.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../models/product.model.js";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/products", async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const result = await fetchProducts(page, limit);

    res.render("products", {
      products: result.data,
      currentPage: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/add", async (req, res, next) => {
  try {
    const categories = await getCategoriesModel();
    res.render("addProduct", { categories });
  } catch (err) {
    next(err);
  }
});

router.post("/products/add", async (req, res, next) => {
  try {
    const { product_name, category_id } = req.body;
    await createProduct(product_name, category_id);
    res.redirect("/products");
  } catch (err) {
    next(err);
  }
});

router.get("/products/edit/:id", async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    
    const categories = await getCategoriesModel();

    res.render("editProduct", {
      product: product,
      categories,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/products/update/:id", async (req, res, next) => {
  try {
    const { product_name, category_id } = req.body;
    await updateProduct(req.params.id, product_name, category_id);
    res.redirect("/products");
  } catch (err) {
    next(err);
  }
});

router.get("/products/delete/:id", async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.redirect("/products");
  } catch (err) {
    next(err);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await getCategoriesModel();
    res.render("categories", { categories });
  } catch (error) {
    next(error);
  }
});

router.post("/categories/add", async (req, res, next) => {
  try {
    await createCategory(req.body.category_name);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
});

router.get("/categories/delete/:id", async (req, res, next) => {
  try {
    await deleteCategory(req.params.id);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
});

router.get("/categories/edit/:id", async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);

    res.render("editCategory", { category });
  } catch (err) {
    next(err);
  }
});

router.post("/categories/update/:id", async (req, res, next) => {
  try {
    await updateCategory(req.params.id, req.body.category_name);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
});

export default router;

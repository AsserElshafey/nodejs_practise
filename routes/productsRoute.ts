import { Router } from "express";
import ProductController from "../controllers/productController";
import ProductService from "../services/ProductService";
import { generateProducts } from "../utils/fakeData";

const productsRouter = Router();

const fakeProducts = generateProducts();

const productService = new ProductService(fakeProducts);
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = new ProductController(productService);

productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsRouter;

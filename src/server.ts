import express from "express";
import { generateProducts } from "./utils/fakeData";
import { IProduct } from "./interfaces";
import ProductService from "./services/ProductService";
import ProductController from "./controllers/productController";

const app = express();

const PORT: number = 8000;

const fakeProducts = generateProducts();

const productService = new ProductService(fakeProducts);
const productController = new ProductController(productService);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// endpoints (Products)

app.get("/products", (req, res) => productController.getAllProducts(req, res));

app.get("/products/:id", (req, res) =>
  productController.getProductById(req, res)
);

app.post("/products", (req, res) => productController.createProduct(req, res));

app.patch("/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);

app.delete("/products/:id", (req, res) =>
  productController.deleteProduct(req, res)
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

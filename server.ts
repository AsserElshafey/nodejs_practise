import express from "express";
import { generateProducts } from "./utils/fakeData";
import { IProduct } from "./interfaces";
import ProductService from "./services/ProductService";
import ProductController from "./controllers/productController";
import path from "path";

const app = express();

const PORT: number = 8000;

const fakeProducts = generateProducts();

const productService = new ProductService(fakeProducts);
const productController = new ProductController(productService);

app.use(express.json());

// * set views directory and engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// * static file
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "My Pug Template", message: "Hello there!" });
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

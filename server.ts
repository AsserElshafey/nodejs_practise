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

// endpoints (Pug template)
app.get("/", (req, res) => {
  res.render("index", { title: "My Pug Template", message: "Hello there!" });
});

app.get("/products", (req, res) =>
  productController.renderProductsList(req, res)
);

app.get("/products/:id", (req, res) =>
  productController.renderProductPage(req, res)
);

// endpoints (Products)

app.get("/api/products", (req, res) =>
  productController.getAllProducts(req, res)
);

app.get("/api/products/:id", (req, res) =>
  productController.getProductById(req, res)
);

app.post("/api/products", (req, res) =>
  productController.createProduct(req, res)
);

app.patch("/api/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);

app.delete("/api/products/:id", (req, res) =>
  productController.deleteProduct(req, res)
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

app.get("/not", (req, res) => {
  res.status(404).render("notFound", { title: "Not Found!" });
});

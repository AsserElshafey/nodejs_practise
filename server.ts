import express from "express";
import { generateProducts } from "./utils/fakeData";
import ProductService from "./services/ProductService";
import ProductController from "./controllers/productController";
import ProductsViewController from "./controllers/productsViewController";
import path from "path";
import productsRouter from "./routes/productsRoute";

const app = express();

const PORT: number = 8000;

const fakeProducts = generateProducts();

const productService = new ProductService(fakeProducts);
const productController = new ProductController(productService);
const productsViewController = new ProductsViewController(productService);

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
  productsViewController.renderProductsList(req, res)
);

app.get("/products/:id", (req, res) =>
  productsViewController.renderProductPage(req, res)
);

// endpoints (Products)
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

app.get("/not", (req, res) => {
  res.status(404).render("notFound", { title: "Not Found!" });
});

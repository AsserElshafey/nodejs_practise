import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { generateProducts } from "./utils/fakeData";
import ProductService from "./services/ProductService";
import ProductController from "./controllers/productController";
import ProductsViewController from "./controllers/productsViewController";
import path from "path";
import productsRouter from "./routes/productsRoute";
import ErrorMiddleware from "./middlewares/Error";
import NotFoundMiddleware from "./middlewares/NotFound";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(
  helmet({
    contentSecurityPolicy: false,
    xFrameOptions: {
      action: "deny",
    },
  })
);

app.use(compression());

app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests.
app.use(limiter);

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

// error handler
app.use(NotFoundMiddleware.handle);
app.use(ErrorMiddleware.handle);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

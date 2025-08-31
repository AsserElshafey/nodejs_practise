import ProductService from "../services/ProductService";
import { Request, Response } from "express";
import { IProduct } from "../interfaces";
import { title } from "process";

export default class ProductController {
  constructor(private productService: ProductService) {}

  getAllProducts(req: Request, res: Response) {
    const filterQuery = req.query.filter as string;
    if (filterQuery) {
      return res.send(this.productService.getProductsByQuery(filterQuery));
    }
    return res.send(this.productService.getAllProducts());
  }

  getProductById(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      return res.status(400).send("invalid product id");
    }
    const product: IProduct | undefined =
      this.productService.getProductById(productId);
    if (!product) {
      return res.status(404).send("product not found");
    }
    return res.send(product);
  }

  createProduct(req: Request, res: Response) {
    const productBody = req.body;
    this.productService.createProduct(productBody);

    res.status(201).send({
      id: this.productService.getAllProducts().length,
      ...productBody,
    });
  }

  updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    const productBody = req.body;
    if (isNaN(productId)) {
      return res.status(400).send("invalid product id");
    }
    const productIndex: number | undefined = this.productService
      .getAllProducts()
      .findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      this.productService.updateProductByIndex(productIndex, productBody);
      return res.status(200).send({ message: "product updated successfully" });
    }
    return res.status(404).send({ message: "product not found" });
  }

  deleteProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      return res.status(400).send("invalid product id");
    }
    const productIndex: number | undefined = this.productService
      .getAllProducts()
      .findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      this.productService.getAllProducts().splice(productIndex, 1);
      return res.status(200).send({ message: "product deleted successfully" });
    }
    return res.status(404).send({ message: "product not found" });
  }

  renderProductsList(req: Request, res: Response) {
    res.render("products", {
      title: "My Products",
      description: "This is the products page rendered by Express.",
      products: this.productService.getAllProducts(),
    });
  }

  renderProductPage(req: Request, res: Response) {
    const productId = +req.params.id;

    res.render("productDetails", {
      products: this.productService.getProductById(productId),
    });
  }
}

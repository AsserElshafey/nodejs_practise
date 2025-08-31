import { Request, Response } from "express";
import ProductService from "../services/ProductService";
export default class ProductsViewController {
  constructor(private productService: ProductService) {}

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

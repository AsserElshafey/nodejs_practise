import { IProduct } from "../interfaces";

type ProductBody = {
  name: string;
  price: string;
  description: string;
  imageURL: string;
};

export default class ProductService {
  constructor(private products: IProduct[]) {
    this.products = products;
  }

  getAllProducts(): IProduct[] {
    return this.products;
  }

  getProductsByQuery(filterQuery?: string) {
    if (filterQuery) {
      const propertiesToFilter = filterQuery.split(",");
      let filteredProducts = [];
      filteredProducts = this.getAllProducts().map((product) => {
        const filteredProducts: any = {};
        propertiesToFilter.forEach((property) => {
          if (product.hasOwnProperty(property as keyof IProduct)) {
            filteredProducts[property] = product[property as keyof IProduct];
          }
        });
        return { id: product.id, ...filteredProducts };
      });
      return filteredProducts;
    }
    return this.getAllProducts();
  }

  getProductById(productId: number) {
    return this.getAllProducts().find((product) => product.id === productId);
  }

  createProduct(productBody: ProductBody) {
    return this.getAllProducts().push({
      id: this.getAllProducts().length + 1,
      ...productBody,
    });
  }

  updateProductByIndex(index: number, productBody: ProductBody) {
    return (this.getAllProducts()[index] = {
      ...this.getAllProducts()[index],
      ...productBody,
    });
  }
}

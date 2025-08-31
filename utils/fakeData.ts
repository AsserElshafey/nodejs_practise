import { faker } from "@faker-js/faker";
import { IProduct } from "../interfaces";

export const generateProducts = (): IProduct[] => {
  return Array.from({ length: 100 }, (_, idx) => {
    return {
      id: idx + 1,
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 100, max: 1000 }),
      description: faker.commerce.productDescription(),
    };
  });
};

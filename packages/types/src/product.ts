import type { Product, Category } from "@repo/product-db";

export type ProductType = Product;

export type ProductsType = ProductType[];

export type stripeProductType = {
    id: string;
    name: string;
    price: number;
};

export type CategoryType = Category;
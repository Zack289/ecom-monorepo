import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";
import { producer } from "../utils/kafka";
import { stripeProductType } from "@repo/types";

// Create a product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Validate required fields
    const requiredFields = ['name', 'shortDescription', 'description', 'price', 'colors', 'images', 'sizes', 'categorySlug'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        missingFields,
        requiredFields 
      });
    }

    const { colors, images, price, categorySlug } = data;
    
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return res.status(400).json({ message: "Colors array is required and must not be empty" });
    }

    if (!images || typeof images !== "object") {
      return res.status(400).json({ message: "Images object is required" });
    }

    const missingColors = colors.filter((color: string) => !(color in images));
    if (missingColors.length > 0) {
      return res
        .status(400)
        .json({ message: "Missing images for colors", missingColors });
    }

    // Ensure price is an integer
    const priceInt = Number(price);
    if (!Number.isInteger(priceInt) || priceInt < 0) {
      return res.status(400).json({ 
        message: "Price must be a positive integer (in cents)", 
        received: price,
        type: typeof price
      });
    }

    // Ensure sizes is an array
    if (!Array.isArray(data.sizes) || data.sizes.length === 0) {
      return res.status(400).json({ message: "Sizes array is required and must not be empty" });
    }

    // Prepare data for Prisma
    const productData: Prisma.ProductCreateInput = {
      name: data.name,
      shortDescription: data.shortDescription,
      description: data.description,
      price: priceInt,
      colors: colors as string[],
      sizes: data.sizes as string[],
      images: images,
      categorySlug: categorySlug,
    };

    const product = await prisma.product.create({ data: productData });

    const stripeProduct: stripeProductType = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    };

    producer.sendMsg("Product created", { value: stripeProduct });

    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ 
      message: "Failed to create product",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  res.status(200).json(updateProduct);
};

// Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await prisma.product.delete({
    where: { id: Number(id) },
  });

    producer.sendMsg("Product deleated", { value: Number(id) });

  res
    .status(200)
    .json({ message: "Product deleted sucessfully", deletedProduct });
};

// Get all Products
export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
        break;

      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;

      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;

      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  res.status(200).json(products);
};

// Get a single product
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  res.status(200).json(product);
};

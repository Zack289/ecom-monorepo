import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

// Create a category
export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;

  const category = await prisma.category.create({ data });
  res.status(201).json(category);
  console.log("req.body:", req.body);
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data: Prisma.CategoryUpdateInput = req.body;

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  res.status(200).json(updatedCategory);
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });

  res
    .status(200)
    .json({ message: "Category deleted sucessfully", deletedCategory });
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.status(200).json(categories);
};

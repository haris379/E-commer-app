import Product from "../model/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, category, price, image, stock } = req.body;

    if (!title || !description || !category || !price || !image) {
      return res.status(404).json({ message: "Please Enter all Fields" });
    }

    const product = await Product.create({
      title,
      description,
      category,
      price,
      image,
      stock,
    });

    res.status(200).json({
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Product", error });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No product" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Product", error });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No product", products: [] });
    }
    res.status(200).json({
      message: "Products Fetched Successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Product", error });
  }
};

// Get All Catagory

export const getAllCategory = async (req, res) => {
  try {
    const category = await Product.distinct("category");
    if (!category) {
      return res.status(404).json({ message: "No category" });
    }
    res.status(200).json({
      message: "Category Fetched Successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Catrgory", error });
  }
};

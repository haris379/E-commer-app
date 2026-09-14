import Product from "../model/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, category, price, image, stock } = req.body;

    if (!title || !description || !category || !price || !image) {
      return res.status(400).json({ message: "Please Enter all Fields" });
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

    const product = await Product.findOne(id);
    if (!product) {
      return res.status(400).json({ message: "No product" });
    }
    await Product.findOneAndDelete(id);
    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Product", error });
  }
};

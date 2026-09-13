import Product from "../model/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, category, price, image, stock } = req.body;

    if ((!title, !description, !category, !price, !image, !stock)) {
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
      message: "Product Added Successfulluy",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Product", error });
  }
};

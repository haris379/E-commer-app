import Cart from "../model/Cart.js";

// AddtoCart

export const addtoCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({userId});
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((p) => p._id.toString() === productId);
      if (item) {
        item.quantity += 1;
      }
      cart.items.push({ productId, quantity: 1 });
    }
    await cart.save();
    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Product in Cart", error });
  }
};

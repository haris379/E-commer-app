import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/cart/${userId}`);
      // console.log(response.data.cart.items);
      setCart(response.data.cart.items);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.post("/cart/removeItem", {
        userId,
        productId,
      });
      // console.log(response.data);
      await loadCart();
      setCart(response.data.cart?.items || []);
    } catch (error: any) {
      console.log(error);
    }
  };

  const increaseQuantity = async (productId: any) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.put(`/cart/increase/${productId}`, { userId });

      console.log(response.data);
      loadCart();
    } catch (error) {}
  };

  return (
    <>
      <div className="min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="font-bold text-xl text-ink mb-6">
            <Link
              to="/home/"
              className="flex items-center gap-2 text-sm text-ink-soft hover:text-navy mb-4"
            >
              ← Back
            </Link>
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <p>No Item in your cart</p>
          ) : (
            cart.map((item: any) => {
              if (!item.productId) return null;
              return (
                <div key={item._id} className="space-y-3 p-4">
                  <div className="card flex flex-wrap items-center justify-around gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="w-16 h-16 object-cover rounded-md bg-paper"
                      />
                      <div>
                        <h2 className="font-semibold text-ink">
                          {item.productId.title}
                        </h2>
                        <p className="text-sm text-ink-soft">
                          {item.productId.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border border-line rounded-lg px-1">
                      <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-navy transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-sm text-center text-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.productId._id)}
                        className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-navy transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Rs. 4,500
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="text-sm bg-red-700 text-white p-3 rounded-2xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

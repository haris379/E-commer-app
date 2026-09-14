import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashBoard = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data.products);
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await api.delete(`/product/delete/${id}`);
      alert("Product Deleted Successfully");
      loadProducts();
    } catch (error: any) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="m-20">
          <div className="page-shell max-w-4xl">
            <Link
              to="/"
              className="text-sm  text-black p-3 rounded-2xl"
            >
              Back
            </Link>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold mt-1">
                  Product List
                </h2>
              </div>
              <Link
                to="/admin/products/add-product"
                className="text-sm bg-blue-700 text-white p-3 rounded-2xl"
              >
                + Add New Product
              </Link>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full min-w-140  border border-black rounded-b-full2xl text-sm">
                <thead>
                  <tr className="bg-navy text-blacl text-left">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr
                      key={product._id}
                      className="border-t border-line hover:bg-paper transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-ink">
                        {product.title}
                      </td>
                      <td className="px-4 py-3 price-mono text-navy">
                        {product.price}{" "}
                      </td>
                      <td className="px-4 py-3">{product.stock}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to={`/admin/products/update/${product._id}`}
                          className="text-navy font-medium hover:underline mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-sm bg-red-700 text-white p-3 rounded-2xl"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;

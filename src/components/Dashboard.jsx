import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        // DummyJSON returns data in a format like { products: [...], total: 100, ... }
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600 mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
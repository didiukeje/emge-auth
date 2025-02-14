import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from "../api/axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/signin');
  }, [logout, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black/80 p-8">
      {/* Header section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-8 mb-8 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Product Dashboard</h1>
            <p className="text-blue-100">Explore our latest collection</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-gray-900 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-blue-500/20 hover:border-blue-500/40"
          >
            {/* Price tag */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                ${product.price}
              </span>
              <span className="text-blue-400 text-sm">ID: {product.id}</span>
            </div>

            {/* Product title */}
            <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">
              {product.title}
            </h2>

            {/* Product description */}
            <p className="text-gray-400 text-sm line-clamp-3 mb-4">
              {product.description}
            </p>

            {/* Action button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
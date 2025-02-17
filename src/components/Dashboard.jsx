import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from "../api/axios";

const ProductSkeleton = () => (
  <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-blue-500/20 animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="bg-gray-700 h-6 w-20 rounded-full"></div>
      <div className="bg-gray-700 h-4 w-16 rounded"></div>
    </div>

    <div className="bg-gray-700 h-7 w-3/4 rounded mb-3"></div>
    <div className="space-y-2 mb-4">
      <div className="bg-gray-700 h-4 w-full rounded"></div>
      <div className="bg-gray-700 h-4 w-5/6 rounded"></div>
      <div className="bg-gray-700 h-4 w-4/6 rounded"></div>
    </div>

    <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
  </div>
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/signin');
  }, [logout, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black/80 p-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          products.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-900 rounded-xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-blue-500/20 hover:border-blue-500/40"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  ${product.price}
                </span>
                <span className="text-blue-400 text-sm">ID: {product.id}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">
                {product.title}
              </h2>

              <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                {product.description}
              </p>

              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
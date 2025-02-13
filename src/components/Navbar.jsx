import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Auth Dashboard
        </Link>
        <div className="flex space-x-4">
          <Link to="/signup" className="hover:underline">
            Sign Up
          </Link>
          <Link to="/signin" className="hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
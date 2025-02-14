import { Helmet } from "react-helmet";
import './App.css'
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


function App() {

  function DynamicTitle() {
  const location = useLocation();
  
    // Define titles based on the current route
    const titles = {
      "/": "Homepage",
      "/signup": "SignUp Page",
      "/signin": "SignIn Page",
    };
  
    return (
      <Helmet>
        <title>{titles[location.pathname] || "Emge Interview"}</title>
      </Helmet>
    );
  }
  
  return (
    <div>
    <DynamicTitle />
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center">Welcome to the Auth Dashboard</h1>
      </div>
    </div>
  );
}

export default App

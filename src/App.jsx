import { Helmet } from "react-helmet";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


function App() {

  function DynamicTitle() {
  const location = useLocation();
  
    const titles = {
      "/signup": "SignUp Page",
      "/signin": "SignIn Page",
      "/dashboard": "Dashboard Page",
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
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center">Welcome to the Auth Dashboard</h1>
      </div>
    </div>
  );
}

export default App

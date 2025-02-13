
// import { Helmet } from "react-helmet";
import './App.css'
import Navbar from "./components/Navbar";

function App() {

  // function DynamicTitle() {
  // const location = useLocation();
  
  //   // Define titles based on the current route
  //   const titles = {
  //     "/": "Home - My Website",
  //     "/about": "About Us - My Website",
  //     "/contact": "Contact - My Website",
  //   };
  
  //   return (
  //     <Helmet>
  //       <title>{titles[location.pathname] || "My Website"}</title>
  //     </Helmet>
  //   );
  // }
  
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center">Welcome to the Auth Dashboard</h1>
      </div>
    </div>
  );
}

export default App

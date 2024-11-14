import Login from "./pages/login/Login";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from 'react-router-dom';
import Categories from './pages/categories/Categories'
import SubCategories from './pages/subcategories/SubCategories'
import Products from "./pages/products/Products";
import Home from "./pages/home/Home";
import Customers from "./pages/customers/Customers";
<<<<<<< HEAD
import Sales from "./pages/sales/Sales";
import Invoice from "./pages/invoice/Invoice";
=======
import Sales from "./pages/SalesCategories/SalesCategories";
import Profile from "./pages/profile/Profile";
import SalesSubCategories from "./pages/SalesCategories/SalesSubCategories";
import SalesProducts from "./pages/SalesCategories/SalesProducts";


>>>>>>> 6ac9415d12c9ba51b39f335ee08170754be11277
function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Dashboard/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/categories/:categoryId" element={<SubCategories/>}/>
          <Route path="/categories/:categoryId/:subcategoryId" element={<Products/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/sales/:salesId" element={<SalesSubCategories/>}/>
          <Route path="/sales/:salesId/:subcategoryId" element={<SalesProducts/>}/>
<<<<<<< HEAD
          <Route path="/invoice" element={<Invoice/>}/>
=======
          <Route path="/profile" element={<Profile/>}/>
>>>>>>> 6ac9415d12c9ba51b39f335ee08170754be11277
        </Route>
    </Routes>
  );
}

export default App;

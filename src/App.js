import Login from "./pages/login/Login";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from 'react-router-dom';
import Categories from './pages/categories/Categories'
import SubCategories from './pages/subcategories/SubCategories'
import Products from "./pages/products/Products";
import Home from "./pages/home/Home";
import Customers from "./pages/customers/Customers";
import Sales from "./pages/SalesCategories/SalesCategories";
import Profile from "./pages/profile/Profile";
import SalesSubCategories from "./pages/SalesCategories/SalesSubCategories";
import SalesProducts from "./pages/SalesCategories/SalesProducts";
import Invoice from "./pages/invoice/Invoice";
import CustomersCategoriesActions from "./pages/customers/CustomersCategoriesActions"
import CustomersProductsActions from "./pages/customers/CustomersProductsActions"
import CustomersSubCategoriesActions from "./pages/customers/CustomersSubCategoriesActions"


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
          <Route path="/customers/customersact" element={<CustomersCategoriesActions/>}/>
          <Route path="/customers/customersact/:customersactId" element={<CustomersSubCategoriesActions/>}/>
          <Route path="/customers/customersact/:customersactId/:subcategoryId" element={<CustomersProductsActions/>}/>
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/sales/:salesId" element={<SalesSubCategories/>}/>
          <Route path="/sales/:salesId/:subcategoryId" element={<SalesProducts/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/invoice" element={<Invoice/>}/>
        </Route>
    </Routes>
  );
}

export default App;

import Login from "./components/Login/Login";
import Home from "./components/Home/Home"
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Categories from "./components/Categories/Categories";
import Customers from "./components/Customers/Customers";
import SubCategories from "./components/SubCategories/SubCategories";

function App() {
  return (
    <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route element={<Main/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/Categories" element={<Categories/>}/>
          <Route path="/Categories/:CategoryId" element={<SubCategories/>}></Route>
          <Route path="/Categories/:CategoryId/:SubCategoryId" element={<div>products</div>}></Route>
          <Route path="/Customers" element={<Customers/>}/>

        </Route>
    </Routes>
  );
}

export default App;

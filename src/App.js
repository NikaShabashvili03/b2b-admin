import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  return (
    <Routes>
        <Route path="/" element={<div>123</div>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<div>Register</div>}/>
    </Routes>
  );
}

export default App;

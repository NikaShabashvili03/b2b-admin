import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home"
import Main from "./components/Main/Main";
function App() {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<Main/>}>
          <Route path="/Home" element={<Home/>}/>
        </Route>
    </Routes>
  );
}

export default App;

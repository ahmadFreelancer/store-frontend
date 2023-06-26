import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard"
import Header from "./Header"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SingleProduct from "./SingleProduct";

function App() {

  if (window.location.pathname === "/") {
    window.location.pathname = "/login"
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes >

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

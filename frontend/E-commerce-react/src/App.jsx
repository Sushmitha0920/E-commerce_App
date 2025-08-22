import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/home";
import About from "./pages/About";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <nav>
          <Link to="/" className="me-3">Home</Link> |{" "}
          <Link to="/cart" className="me-3">Cart</Link> |{" "}
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

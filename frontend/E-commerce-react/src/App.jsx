import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4"
          style={{ padding: '1rem 0', borderRadius: 0 }}
        >
          <div className="container d-flex align-items-center justify-content-between">
            <Link to="/" className="navbar-brand fw-bold fs-3" style={{ color: '#2d3748', letterSpacing: 1 }}>
              🛒 E-Shop
            </Link>
            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="nav-link px-3 fs-5" style={{ color: '#2d3748' }}>
                Home
              </Link>
              <Link to="/cart" className="nav-link px-3 fs-5" style={{ color: '#2d3748' }}>
                Cart
              </Link>
              <Link to="/about" className="nav-link px-3 fs-5" style={{ color: '#2d3748' }}>
                About
              </Link>
            </div>
          </div>
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


import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId ? Number(categoryId) : null);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory ? product.category?.id === selectedCategory : true;
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      }
      return b.price - a.price;
    });

  return (
    <div className="home-bg min-vh-100 py-4" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ color: "#2d3748" }}>Welcome to the Product Catalog</h1>
          <p className="lead" style={{ color: "#4a5568" }}>
            Discover our latest products and add your favorites to the cart!
          </p>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="row align-items-center p-3 rounded shadow-sm bg-white justify-content-center">
              <div className="col-md-4 mb-2 d-flex justify-content-center">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: "0.5rem", maxWidth: 300 }}
                />
              </div>
              <div className="col-md-4 mb-2 d-flex justify-content-center">
                <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
              </div>
              <div className="col-md-4 mb-2 d-flex justify-content-center">
                <select
                  className="form-select form-select-lg"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={{ borderRadius: "0.5rem", maxWidth: 220 }}
                >
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {filteredProducts.length ? (
              <ProductList products={filteredProducts} />
            ) : (
              <div className="text-center mt-5">
                <p className="fs-4 text-muted">No Products Found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
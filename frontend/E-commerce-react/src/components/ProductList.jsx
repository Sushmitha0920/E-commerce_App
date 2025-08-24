import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-md-6 col-lg-4 col-sm-12" key={product.id}>
          <div className="card h-100 shadow-sm border-0 rounded-4 product-card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
            <img
              src={product.imageUrl || 'http://placehold.co/600x400'}
              className="card-img-top rounded-top-4"
              alt={product.name}
              style={{ objectFit: 'cover', height: 220 }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold" style={{ color: '#2d3748' }}>{product.name}</h5>
              <p className="card-text text-muted" style={{ minHeight: 48 }}>{product.description}</p>
              <p className="card-text fs-5 mb-3"><strong>${product.price}</strong></p>
              <button
                className="btn btn-primary mt-auto w-100"
                style={{ borderRadius: '0.5rem', fontWeight: 600 }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

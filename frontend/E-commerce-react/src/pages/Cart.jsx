import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, loading, error } = useCart();

  // Debug log
  // console.log("Cart object:", cart);

  if (loading) {
    return (
      <div className="container-fluid py-5" style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <h1 className="my-4">Your Cart</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-5" style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <h1 className="my-4">Your Cart</h1>
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  // Fallback for undefined items
  const items = cart.items || [];

  return (
    <div className="container-fluid py-5" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <h1 className="my-4 text-center">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul className="list-group mb-4 shadow-sm rounded-4 w-100" style={{ maxWidth: '100vw' }}>
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-white border-0 border-bottom flex-wrap w-100" style={{ paddingLeft: 32, paddingRight: 32 }}>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <img
                    src={item.product.imageUrl || 'http://placehold.co/80x80'}
                    alt={item.product.name}
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 12, border: '1px solid #eee' }}
                  />
                  <div>
                    <strong className="fs-5" style={{ color: '#2d3748' }}>{item.product.name}</strong>
                    <div className="text-muted small">${item.product.price}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="form-control form-control-sm text-center"
                    style={{ width: 60, borderRadius: 8 }}
                    onChange={e => updateQuantity(item, parseInt(e.target.value, 10))}
                  />
                  <span className="badge bg-primary fs-6" style={{ borderRadius: 8 }}>
                    x{item.quantity}
                  </span>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    style={{ borderRadius: 8 }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center p-4 bg-white rounded-4 shadow-sm w-100" style={{ maxWidth: '100vw' }}>
            <h4 className="mb-0">Total: <span className="text-success">${cart.totalPrice ? cart.totalPrice.toFixed(2) : '0.00'}</span></h4>
            <button className="btn btn-warning px-4 py-2 fw-bold" style={{ borderRadius: 12 }} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

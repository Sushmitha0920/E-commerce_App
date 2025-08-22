import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, loading, error } = useCart();

  // Debug log
  console.log("Cart object:", cart);

  if (loading) {
    return (
      <div className="container">
        <h1 className="my-4">Your Cart</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
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
    <div className="container">
      <h1 className="my-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.product.name}</strong> - ${item.product.price}
                  <span className="ms-3">Quantity: 
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      style={{ width: 60, marginLeft: 8, marginRight: 8 }}
                      onChange={e => updateQuantity(item, parseInt(e.target.value, 10))}
                    />
                  </span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total: ${cart.totalPrice ? cart.totalPrice.toFixed(2) : '0.00'}</h4>
            <button className="btn btn-warning" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const API_BASE_URL = 'http://localhost:8080/api';

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [cartId, setCartId] = useState(() => localStorage.getItem('cartId'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create cart if not exists
  const createCart = async () => {
    try {
      console.log('Creating new cart...');
      const response = await fetch(`${API_BASE_URL}/cart/create`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to create cart');
      const data = await response.json();
      console.log('Cart created:', data);
      localStorage.setItem('cartId', data.id);
      setCartId(data.id);
      return data.id;
    } catch (err) {
      console.error('Error creating cart:', err);
      setError(err.message);
    }
  };

  // Fetch cart (full object)
  const fetchCart = async (id = cartId) => {
    if (!id) return;
    try {
      setLoading(true);
      console.log('Fetching cart with ID:', id);
      const response = await fetch(`${API_BASE_URL}/cart/${id}`);
      if (!response.ok) {
        // If cart doesn't exist, create a new one
        if (response.status === 404) {
          console.log('Cart not found, creating new cart...');
          const newCartId = await createCart();
          return fetchCart(newCartId);
        }
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      console.log('Cart fetched:', data);
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cartId) {
      createCart().then((id) => {
        if (id) fetchCart(id);
      });
    } else {
      fetchCart(cartId);
    }
    // eslint-disable-next-line
  }, [cartId]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('CartId:', cartId);
    console.log('Product:', product);
    console.log('Quantity:', quantity);

    if (!cartId) {
      console.error('No cartId available');
      return;
    }

    try {
      const url = `${API_BASE_URL}/cart/${cartId}/add?productId=${product.id}&quantity=${quantity}`;
      console.log('API URL:', url);
      
      const response = await fetch(url, { method: 'POST' });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to add item to cart: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      setCart(data);
      alert(`${product.name} has been added to cart!`);
      
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove item from cart');
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update quantity of a cart item
  const updateQuantity = async (item, newQuantity) => {
    if (!cartId) return;
    // Remove if newQuantity is 0
    if (newQuantity <= 0) {
      await removeFromCart(item.id);
      return;
    }
    await addToCart(item.product, newQuantity - item.quantity);
  };

  // Clear cart
  const clearCart = async () => {
    if (!cartId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${cartId}/clear`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
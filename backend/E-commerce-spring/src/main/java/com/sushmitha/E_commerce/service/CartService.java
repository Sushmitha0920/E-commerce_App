package com.sushmitha.E_commerce.service;


import com.sushmitha.E_commerce.model.Cart;
import com.sushmitha.E_commerce.model.CartItem;
import com.sushmitha.E_commerce.model.Product;
import com.sushmitha.E_commerce.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // Create a new empty cart
    public Cart createCart() {
        Cart cart = new Cart();
        return cartRepository.save(cart);
    }

    // Get cart by ID
    public Cart getCart(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found with id: " + cartId));
    }

    // Add product to cart
    public Cart addToCart(Long cartId, Long productId, Integer quantity) {
        // Find the cart
        Cart cart = getCart(cartId);

        // Find the product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

        if (existingItem.isPresent()) {
            // If item exists, update quantity
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            // If item doesn't exist, create new cart item
            CartItem newItem = new CartItem(cart, product, quantity);
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        // Recalculate total price
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    // Remove item from cart
    public Cart removeFromCart(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Cart cart = item.getCart();
        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }

    // Clear entire cart
    public Cart clearCart(Long cartId) {
        Cart cart = getCart(cartId);
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cart.calculateTotalPrice();
        return cartRepository.save(cart);
    }
}
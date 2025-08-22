package com.sushmitha.E_commerce.repository;


import com.sushmitha.E_commerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Custom method to find item by cart and product
    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}

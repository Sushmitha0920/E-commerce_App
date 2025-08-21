package com.sushmitha.E_commerce.config;

import com.sushmitha.E_commerce.model.Category;
import com.sushmitha.E_commerce.model.Product;
import com.sushmitha.E_commerce.repository.CategoryRepository;
import com.sushmitha.E_commerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository  productRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        //clear all existing  data
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        //create categories
        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home and Kitchen");

        categoryRepository.saveAll(Arrays.asList(electronics, clothing, home));

        //Create Products
        Product phone = new Product();
        phone.setName("Phone");
        phone.setDescription("Phone Description");
        phone.setImageUrl("https://placehold.co/600x400");
        phone.setPrice(699.99);
        phone.setCategory(electronics);

        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("Laptop Description");
        laptop.setImageUrl("https://placehold.co/600x400");
        laptop.setPrice(999.99);
        laptop.setCategory(electronics);

        Product jacket = new Product();
        jacket.setName("Jacket");
        jacket.setDescription("Jacket Description");
        jacket.setImageUrl("https://placehold.co/600x400");
        jacket.setPrice(199.99);
        jacket.setCategory(clothing);

        Product blender = new Product();
        blender.setName("Blender");
        blender.setDescription("Blender Description");
        blender.setImageUrl("https://placehold.co/600x400");
        blender.setPrice(899.99);
        blender.setCategory(home);

        productRepository.saveAll(Arrays.asList(phone, laptop, jacket, blender));
    }
}

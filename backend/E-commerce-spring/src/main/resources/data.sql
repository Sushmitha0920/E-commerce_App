-- Categories
INSERT INTO category (name) VALUES ('Electronics');
INSERT INTO category (name) VALUES ('Clothing');
INSERT INTO category (name) VALUES ('Home and Kitchen');
INSERT INTO category (name) VALUES ('Books');
INSERT INTO category (name) VALUES ('Toys & Games');
INSERT INTO category (name) VALUES ('Sports & Outdoors');

-- Products

-- Electronics
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('Smartphone', 'Latest smartphone with high-end features', 'https://placehold.co/600x400', 699.99, 1),
    ('Laptop', 'Powerful laptop for work and gaming', 'https://placehold.co/600x400', 1199.99, 1),
    ('Headphones', 'Noise-cancelling over-ear headphones', 'https://placehold.co/600x400', 199.99, 1);

-- Clothing
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('Jacket', 'Warm winter jacket', 'https://placehold.co/600x400', 149.99, 2),
    ('T-Shirt', 'Casual cotton t-shirt', 'https://placehold.co/600x400', 29.99, 2);

-- Home and Kitchen
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('Blender', 'High-speed kitchen blender', 'https://placehold.co/600x400', 89.99, 3),
    ('Coffee Maker', 'Automatic coffee machine', 'https://placehold.co/600x400', 129.99, 3);

-- Books
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 'https://placehold.co/600x400', 15.99, 4),
    ('Java Programming', 'Comprehensive guide to Java programming', 'https://placehold.co/600x400', 49.99, 4);

-- Toys & Games
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('Lego Set', 'Creative building blocks', 'https://placehold.co/600x400', 59.99, 5),
    ('Puzzle Game', '1000-piece challenging puzzle', 'https://placehold.co/600x400', 19.99, 5);

-- Sports & Outdoors
INSERT INTO product (name, description, image_url, price, category_id)
VALUES
    ('Yoga Mat', 'Non-slip exercise mat', 'https://placehold.co/600x400', 25.99, 6),
    ('Basketball', 'Official size and weight', 'https://placehold.co/600x400', 29.99, 6);

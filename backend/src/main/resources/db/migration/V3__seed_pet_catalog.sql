DO $$
DECLARE
    golden_retriever_id BIGINT;
    bengal_cat_id BIGINT;
    holland_lop_id BIGINT;
    parakeet_id BIGINT;
    goldfish_id BIGINT;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets) THEN
        INSERT INTO pets (name, category, breed, age, gender, price, promo_price, description, stock_quantity, image_url, vaccination_status, is_active, featured, trending)
        VALUES ('Golden Retriever', 'Dog', 'Golden Retriever', 'Young', 'Male', 899.00, 799.00, 'Friendly family companion with a calm temperament and a love for daily walks.', 8, 'https://placehold.co/800x600?text=Golden+Retriever', 'Vaccinated', true, true, true)
        RETURNING id INTO golden_retriever_id;

        INSERT INTO pet_images (pet_id, image_url, alt_text, sort_order, primary_image)
        VALUES (golden_retriever_id, 'https://placehold.co/800x600?text=Golden+Retriever', 'Golden Retriever puppy', 0, true);

        INSERT INTO pet_variants (pet_id, size, breed_variation, price, sale_price, stock_quantity, sku, active, featured, trending, sort_order)
        VALUES (golden_retriever_id, 'Medium', 'Classic family companion', 899.00, 799.00, 8, 'DOG-GR-MED-001', true, true, true, 0);

        INSERT INTO pets (name, category, breed, age, gender, price, promo_price, description, stock_quantity, image_url, vaccination_status, is_active, featured, trending)
        VALUES ('Bengal Cat', 'Cat', 'Bengal', 'Adult', 'Female', 699.00, 649.00, 'Active, intelligent cat with a striking coat and playful energy.', 6, 'https://placehold.co/800x600?text=Bengal+Cat', 'Vaccinated', true, true, false)
        RETURNING id INTO bengal_cat_id;

        INSERT INTO pet_images (pet_id, image_url, alt_text, sort_order, primary_image)
        VALUES (bengal_cat_id, 'https://placehold.co/800x600?text=Bengal+Cat', 'Bengal cat portrait', 0, true);

        INSERT INTO pet_variants (pet_id, size, breed_variation, price, sale_price, stock_quantity, sku, active, featured, trending, sort_order)
        VALUES (bengal_cat_id, 'Standard', 'Spotted coat', 699.00, 649.00, 6, 'CAT-BENG-STD-001', true, true, false, 0);

        INSERT INTO pets (name, category, breed, age, gender, price, promo_price, description, stock_quantity, image_url, vaccination_status, is_active, featured, trending)
        VALUES ('Holland Lop', 'Rabbit', 'Holland Lop', 'Juvenile', 'Female', 199.00, NULL, 'Small, affectionate rabbit that fits well into a calm indoor home.', 10, 'https://placehold.co/800x600?text=Holland+Lop', 'Vaccinated', true, false, false)
        RETURNING id INTO holland_lop_id;

        INSERT INTO pet_images (pet_id, image_url, alt_text, sort_order, primary_image)
        VALUES (holland_lop_id, 'https://placehold.co/800x600?text=Holland+Lop', 'Holland Lop rabbit', 0, true);

        INSERT INTO pet_variants (pet_id, size, breed_variation, price, sale_price, stock_quantity, sku, active, featured, trending, sort_order)
        VALUES (holland_lop_id, 'Small', 'Indoor companion', 199.00, NULL, 10, 'RAB-HL-SML-001', true, false, false, 0);

        INSERT INTO pets (name, category, breed, age, gender, price, promo_price, description, stock_quantity, image_url, vaccination_status, is_active, featured, trending)
        VALUES ('Parakeet Pair', 'Bird', 'Budgerigar', 'Young', 'Pair', 129.00, 99.00, 'Bright, social bird pair that enjoys attention and a roomy cage.', 12, 'https://placehold.co/800x600?text=Parakeet+Pair', 'Vaccinated', true, false, true)
        RETURNING id INTO parakeet_id;

        INSERT INTO pet_images (pet_id, image_url, alt_text, sort_order, primary_image)
        VALUES (parakeet_id, 'https://placehold.co/800x600?text=Parakeet+Pair', 'Parakeet pair', 0, true);

        INSERT INTO pet_variants (pet_id, size, breed_variation, price, sale_price, stock_quantity, sku, active, featured, trending, sort_order)
        VALUES (parakeet_id, 'Pair', 'Hand-raised pair', 129.00, 99.00, 12, 'BIRD-PAR-PAIR-001', true, false, true, 0);

        INSERT INTO pets (name, category, breed, age, gender, price, promo_price, description, stock_quantity, image_url, vaccination_status, is_active, featured, trending)
        VALUES ('Fancy Goldfish', 'Fish', 'Goldfish', 'Adult', 'Unknown', 29.00, NULL, 'Easy-care starter pet for a clean aquarium setup.', 25, 'https://placehold.co/800x600?text=Fancy+Goldfish', 'Vaccinated', true, false, false)
        RETURNING id INTO goldfish_id;

        INSERT INTO pet_images (pet_id, image_url, alt_text, sort_order, primary_image)
        VALUES (goldfish_id, 'https://placehold.co/800x600?text=Fancy+Goldfish', 'Fancy goldfish', 0, true);

        INSERT INTO pet_variants (pet_id, size, breed_variation, price, sale_price, stock_quantity, sku, active, featured, trending, sort_order)
        VALUES (goldfish_id, 'Starter Tank', 'One-pet starter setup', 29.00, NULL, 25, 'FISH-GOLD-START-001', true, false, false, 0);
    END IF;
END $$;
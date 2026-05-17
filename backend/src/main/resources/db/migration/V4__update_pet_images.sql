-- Update existing placeholder images with real Unsplash images
UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800' WHERE name = 'Golden Retriever';
UPDATE pet_images SET image_url = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800' WHERE alt_text = 'Golden Retriever puppy';

UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800' WHERE name = 'Bengal Cat';
UPDATE pet_images SET image_url = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800' WHERE alt_text = 'Bengal cat portrait';

UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5030?auto=format&fit=crop&q=80&w=800' WHERE name = 'Holland Lop';
UPDATE pet_images SET image_url = 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5030?auto=format&fit=crop&q=80&w=800' WHERE alt_text = 'Holland Lop rabbit';

UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1552728089-571ebd819b5e?auto=format&fit=crop&q=80&w=800' WHERE name = 'Parakeet Pair';
UPDATE pet_images SET image_url = 'https://images.unsplash.com/photo-1552728089-571ebd819b5e?auto=format&fit=crop&q=80&w=800' WHERE alt_text = 'Parakeet pair';

UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800' WHERE name = 'Fancy Goldfish';
UPDATE pet_images SET image_url = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800' WHERE alt_text = 'Fancy goldfish';

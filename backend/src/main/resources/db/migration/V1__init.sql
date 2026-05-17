-- Flyway baseline: create basic tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  breed VARCHAR(255),
  age VARCHAR(50),
  gender VARCHAR(50),
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  stock_quantity INT NOT NULL DEFAULT 0,
  image_url TEXT,
  vaccination_status VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pets_name ON pets(lower(name));
CREATE INDEX IF NOT EXISTS idx_pets_breed ON pets(lower(breed));
CREATE INDEX IF NOT EXISTS idx_pets_category ON pets(category);

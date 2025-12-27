-- Eneba Game Search Database Setup

-- Enable pg_trgm extension for fuzzy search (optional but recommended)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS games;

-- Create games table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percentage INTEGER,
  cover_image_url TEXT NOT NULL,
  has_cashback BOOLEAN DEFAULT false,
  stock_status VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX idx_title ON games(title);
CREATE INDEX idx_platform ON games(platform);

-- Create trigram index for advanced fuzzy search (if pg_trgm is available)
CREATE INDEX IF NOT EXISTS idx_title_trgm ON games USING gin (title gin_trgm_ops);

-- Insert FIFA 23 variants
INSERT INTO games (title, platform, region, price, original_price, discount_percentage, cover_image_url, has_cashback, stock_status) VALUES
('FIFA 23', 'PC (Origin)', 'GLOBAL', 40.93, 59.99, 32, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop', true, 'Origin'),
('FIFA 23', 'Xbox Series X|S', 'EUROPE', 34.14, 49.99, 32, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop', true, 'Xbox Live'),
('FIFA 23', 'PlayStation 5', 'GLOBAL', 35.15, 49.99, 30, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop', true, 'PSN'),
('FIFA 23', 'Nintendo Switch', 'EUROPE', 36.25, 44.99, 19, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop', true, 'Nintendo');

-- Insert Red Dead Redemption 2 variants
INSERT INTO games (title, platform, region, price, original_price, discount_percentage, cover_image_url, has_cashback, stock_status) VALUES
('Red Dead Redemption 2', 'PC (Rockstar)', 'GLOBAL', 29.99, 59.99, 50, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop', true, 'Rockstar'),
('Red Dead Redemption 2', 'Xbox One', 'GLOBAL', 24.99, 49.99, 50, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop', true, 'Xbox Live'),
('Red Dead Redemption 2', 'PlayStation 4', 'EUROPE', 27.49, 54.99, 50, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop', true, 'PSN'),
('Red Dead Redemption 2', 'PC (Steam)', 'GLOBAL', 32.99, 59.99, 45, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop', true, 'Steam');

-- Insert Split Fiction variants
INSERT INTO games (title, platform, region, price, original_price, discount_percentage, cover_image_url, has_cashback, stock_status) VALUES
('Split Fiction EA App Key (PC) GLOBAL', 'PC (EA App)', 'GLOBAL', 40.93, 59.99, 32, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'EA App'),
('Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE', 'Xbox Series X|S', 'EUROPE', 34.14, 49.99, 32, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'Xbox Live'),
('Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL', 'Xbox Series X|S', 'GLOBAL', 35.15, 49.99, 30, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'Xbox Live'),
('Split Fiction (Nintendo Switch) 2) eShop Key EUROPE', 'Nintendo Switch', 'EUROPE', 36.25, 44.99, 19, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'Nintendo'),
('Split Fiction (PlayStation 5) PSN Key GLOBAL', 'PlayStation 5', 'GLOBAL', 38.99, 54.99, 29, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'PSN'),
('Split Fiction (PlayStation 4) PSN Key EUROPE', 'PlayStation 4', 'EUROPE', 33.50, 49.99, 33, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'PSN'),
('Split Fiction PC Steam Key GLOBAL', 'PC (Steam)', 'GLOBAL', 42.15, 59.99, 30, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop', true, 'Steam');

-- Verify the data
SELECT COUNT(*) as total_games FROM games;
SELECT title, COUNT(*) as variants FROM games GROUP BY title ORDER BY title;

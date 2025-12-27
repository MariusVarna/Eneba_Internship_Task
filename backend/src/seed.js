import pool, { initializeDatabase } from './db.js';

const games = [
    // FIFA 23 variants
    {
        title: 'FIFA 23',
        platform: 'PC (Origin)',
        region: 'GLOBAL',
        price: 40.93,
        original_price: 59.99,
        discount_percentage: 32,
        cover_image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Origin'
    },
    {
        title: 'FIFA 23',
        platform: 'Xbox Series X|S',
        region: 'EUROPE',
        price: 34.14,
        original_price: 49.99,
        discount_percentage: 32,
        cover_image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Xbox Live'
    },
    {
        title: 'FIFA 23',
        platform: 'PlayStation 5',
        region: 'GLOBAL',
        price: 35.15,
        original_price: 49.99,
        discount_percentage: 30,
        cover_image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'PSN'
    },
    {
        title: 'FIFA 23',
        platform: 'Nintendo Switch',
        region: 'EUROPE',
        price: 36.25,
        original_price: 44.99,
        discount_percentage: 19,
        cover_image_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Nintendo'
    },

    // Red Dead Redemption 2 variants
    {
        title: 'Red Dead Redemption 2',
        platform: 'PC (Rockstar)',
        region: 'GLOBAL',
        price: 29.99,
        original_price: 59.99,
        discount_percentage: 50,
        cover_image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Rockstar'
    },
    {
        title: 'Red Dead Redemption 2',
        platform: 'Xbox One',
        region: 'GLOBAL',
        price: 24.99,
        original_price: 49.99,
        discount_percentage: 50,
        cover_image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Xbox Live'
    },
    {
        title: 'Red Dead Redemption 2',
        platform: 'PlayStation 4',
        region: 'EUROPE',
        price: 27.49,
        original_price: 54.99,
        discount_percentage: 50,
        cover_image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'PSN'
    },
    {
        title: 'Red Dead Redemption 2',
        platform: 'PC (Steam)',
        region: 'GLOBAL',
        price: 32.99,
        original_price: 59.99,
        discount_percentage: 45,
        cover_image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Steam'
    },

    // Split Fiction variants
    {
        title: 'Split Fiction EA App Key (PC) GLOBAL',
        platform: 'PC (EA App)',
        region: 'GLOBAL',
        price: 40.93,
        original_price: 59.99,
        discount_percentage: 32,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'EA App'
    },
    {
        title: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE',
        platform: 'Xbox Series X|S',
        region: 'EUROPE',
        price: 34.14,
        original_price: 49.99,
        discount_percentage: 32,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Xbox Live'
    },
    {
        title: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL',
        platform: 'Xbox Series X|S',
        region: 'GLOBAL',
        price: 35.15,
        original_price: 49.99,
        discount_percentage: 30,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Xbox Live'
    },
    {
        title: 'Split Fiction (Nintendo Switch) 2) eShop Key EUROPE',
        platform: 'Nintendo Switch',
        region: 'EUROPE',
        price: 36.25,
        original_price: 44.99,
        discount_percentage: 19,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Nintendo'
    },
    {
        title: 'Split Fiction (PlayStation 5) PSN Key GLOBAL',
        platform: 'PlayStation 5',
        region: 'GLOBAL',
        price: 38.99,
        original_price: 54.99,
        discount_percentage: 29,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'PSN'
    },
    {
        title: 'Split Fiction (PlayStation 4) PSN Key EUROPE',
        platform: 'PlayStation 4',
        region: 'EUROPE',
        price: 33.50,
        original_price: 49.99,
        discount_percentage: 33,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'PSN'
    },
    {
        title: 'Split Fiction PC Steam Key GLOBAL',
        platform: 'PC (Steam)',
        region: 'GLOBAL',
        price: 42.15,
        original_price: 59.99,
        discount_percentage: 30,
        cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=500&fit=crop',
        has_cashback: true,
        stock_status: 'Steam'
    }
];

async function seedDatabase() {
    const client = await pool.connect();

    try {
        // Initialize database first
        await initializeDatabase();

        // Clear existing data
        await client.query('DELETE FROM games');
        console.log('🗑️  Cleared existing game data');

        // Insert seed data
        for (const game of games) {
            await client.query(
                `INSERT INTO games 
          (title, platform, region, price, original_price, discount_percentage, 
           cover_image_url, has_cashback, stock_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    game.title,
                    game.platform,
                    game.region,
                    game.price,
                    game.original_price,
                    game.discount_percentage,
                    game.cover_image_url,
                    game.has_cashback,
                    game.stock_status
                ]
            );
        }

        console.log(`✅ Successfully seeded ${games.length} games`);

        // Verify the data
        const result = await client.query('SELECT COUNT(*) FROM games');
        console.log(`📊 Total games in database: ${result.rows[0].count}`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run the seed function
seedDatabase()
    .then(() => {
        console.log('✅ Database seeding completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Database seeding failed:', error);
        process.exit(1);
    });

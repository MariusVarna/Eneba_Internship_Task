import express from 'express';
import pool from '../db.js';

const router = express.Router();

/**
 * GET /list
 * Returns all games or filtered games based on search query
 * Query params:
 *   - search: optional search term for fuzzy matching
 */
router.get('/list', async (req, res) => {
    try {
        const { search } = req.query;
        let query;
        let params = [];

        if (search) {
            // Fuzzy search using ILIKE with wildcards
            // Also try trigram similarity if extension is available
            query = `
        SELECT 
          id, title, platform, region, price, original_price, 
          discount_percentage, cover_image_url, has_cashback, stock_status
        FROM games
        WHERE 
          title ILIKE $1 
          OR platform ILIKE $1
        ORDER BY 
          CASE 
            WHEN title ILIKE $2 THEN 1
            WHEN title ILIKE $1 THEN 2
            ELSE 3
          END,
          title ASC
      `;
            params = [`%${search}%`, search];
        } else {
            // Return all games
            query = `
        SELECT 
          id, title, platform, region, price, original_price, 
          discount_percentage, cover_image_url, has_cashback, stock_status
        FROM games
        ORDER BY title ASC
      `;
        }

        const result = await pool.query(query, params);

        res.json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch games',
            message: error.message
        });
    }
});

export default router;

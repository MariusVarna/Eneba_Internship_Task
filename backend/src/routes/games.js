import express from 'express';
import pool, { getPool } from '../db.js';

const router = express.Router();

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List all games or search for games
 *     description: Returns a list of all games in the database. Optionally filter results using the search parameter for fuzzy matching on game titles and platforms.
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for fuzzy matching against game titles and platforms (case-insensitive)
 *         example: fifa
 *     responses:
 *       200:
 *         description: Successfully retrieved games
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Number of games returned
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "FIFA 23"
 *                       platform:
 *                         type: string
 *                         example: "PC (Origin)"
 *                       region:
 *                         type: string
 *                         example: "GLOBAL"
 *                       price:
 *                         type: string
 *                         example: "40.93"
 *                       original_price:
 *                         type: string
 *                         example: "59.99"
 *                       discount_percentage:
 *                         type: integer
 *                         example: 32
 *                       cover_image_url:
 *                         type: string
 *                         example: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55"
 *                       has_cashback:
 *                         type: boolean
 *                         example: true
 *                       stock_status:
 *                         type: string
 *                         example: "Origin"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch games"
 *                 message:
 *                   type: string
 *                   example: "Database connection error"
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

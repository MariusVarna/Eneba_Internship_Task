import swaggerJsdoc from 'swagger-jsdoc';

const getServerUrl = () => {
    if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
    }
    if (process.env.NODE_ENV === 'production') {
        return 'https://eneba-backend-production.up.railway.app';
    }
    return `http://localhost:${process.env.PORT || 3000}`;
};

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Eneba Internship Game Search API',
            version: '0.0.1',
            description: 'RESTful API for searching and listing video games with fuzzy search capabilities',
            contact: {
                name: 'API Support',
                email: 'mariusvarna7@gmail.com'
            }
        },
        servers: [
            {
                url: getServerUrl(),
                description: 'API Server'
            }
        ],
        tags: [
            {
                name: 'Games',
                description: 'Game listing and search endpoints'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);

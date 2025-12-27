# Eneba Game Search Application

A full-stack game search application built for the Eneba Software Engineer Intern assignment. Features a React + Tailwind frontend, Node.js/Express backend, and PostgreSQL database.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel] (https://eneba-internship-task-514y.vercel.app)
- **Backend**: [Deployed on Railway] (https://eneba-backend-production.up.railway.app/)
- **Database**: PostgreSQL on Supabase

## 📋 Features

- ✅ Fuzzy search functionality for game titles
- ✅ Responsive grid layout matching Eneba design
- ✅ RESTful API with `/list` and `/list?search=<gamename>` endpoints
- ✅ PostgreSQL database with 15+ game variants
- ✅ Games included: FIFA 23, Red Dead Redemption 2, Split Fiction
- ✅ Docker support for backend deployment
- ✅ Professional UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting (Dockerized)
- **Supabase** - PostgreSQL database

## 📦 Project Structure

```
Eneba/
├── backend/
│   ├── src/
│   │   ├── index.js          # Express server
│   │   ├── db.js             # Database connection
│   │   ├── routes/
│   │   │   └── games.js      # API routes
│   │   └── seed.js           # Database seeding
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── GameCard.jsx
│   │   │   └── GameGrid.jsx
│   │   ├── api/
│   │   │   └── games.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database (local or Supabase)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=development
```

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
npm start
```

The backend will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```env
VITE_API_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

## 🔌 API Documentation

### GET /list
Returns all games in the database.

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": 1,
      "title": "FIFA 23",
      "platform": "PC (Origin)",
      "region": "GLOBAL",
      "price": "40.93",
      "original_price": "59.99",
      "discount_percentage": 32,
      "cover_image_url": "https://...",
      "has_cashback": true,
      "stock_status": "Origin"
    }
  ]
}
```

### GET /list?search=<gamename>
Searches for games matching the query (fuzzy search).

**Example:**
```bash
curl http://localhost:3000/list?search=fifa
```

**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [...]
}
```

## 🐳 Docker Deployment

### Build Docker Image
```bash
cd backend
docker build -t eneba-backend .
```

### Run Docker Container
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=your_database_url \
  -e NODE_ENV=production \
  eneba-backend
```

## 🌐 Deployment Guide

### Backend (Railway)

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set environment variables:
   - `DATABASE_URL` - Your Supabase PostgreSQL connection string
   - `NODE_ENV` - `production`
   - `FRONTEND_URL` - Your Vercel frontend URL
4. Railway will automatically detect the Dockerfile and deploy

### Frontend (Vercel)

1. Import your GitHub repository to Vercel
2. Set framework preset to "Vite"
3. Set environment variable:
   - `VITE_API_URL` - Your Railway backend URL
4. Deploy

### Database (Supabase)

1. Create a new project on Supabase
2. Copy the PostgreSQL connection string
3. Run the seed script locally pointing to Supabase:
```bash
DATABASE_URL=your_supabase_url npm run seed
```

## 🎮 Games Included

The application includes 15+ game variants across 3 titles:

1. **FIFA 23** (4 variants)
   - PC (Origin), Xbox Series X|S, PlayStation 5, Nintendo Switch

2. **Red Dead Redemption 2** (4 variants)
   - PC (Rockstar), PC (Steam), Xbox One, PlayStation 4

3. **Split Fiction** (7 variants)
   - PC (EA App), PC (Steam), Xbox Series X|S (multiple regions), PlayStation 4/5, Nintendo Switch

## 📝 Assignment Requirements Checklist

- ✅ React frontend
- ✅ Tailwind CSS styling
- ✅ Node.js backend
- ✅ PostgreSQL database
- ✅ `/list` API endpoint
- ✅ `/list?search=<gamename>` with fuzzy search
- ✅ At least 3 games (FIFA 23, Red Dead Redemption 2, Split Fiction)
- ✅ Self-hosted via public URL (Vercel + Railway)
- ✅ Docker support for backend
- ✅ Design matches provided screenshot
- ✅ AI prompt history included

## 👨‍💻 Development

### Running Tests
```bash
# Backend API test
curl http://localhost:3000/list
curl http://localhost:3000/list?search=fifa

# Frontend
npm run dev
```

### Code Quality
- ES6+ JavaScript with modules
- Clean component architecture
- Responsive design
- Error handling
- Loading states
# Personalized OTT Dashboard

## Overview

Personalized OTT Dashboard is a full-stack web application that helps users discover movies, manage watchlists, track subscriptions, receive recommendations, and maintain watch history in one place.

## Features

* User Registration and Login
* Search Movies using TMDB API
* Add Movies to Watchlist
* Personalized Recommendations
* Subscription Tracker
* Watch History Tracking
* Responsive User Interface
* Secure Authentication with JWT
* Database Integration using Supabase

## Tech Stack

### Frontend

* React.js
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js

### Database

* Supabase

### Deployment

* Frontend: Vercel
* Backend: Render

## Project Structure

Personalized-OTT-Dashboard/

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

├── backend/

│ ├── routes/

│ ├── models/

│ └── server.js

└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/bhavani-moguluri/Personalized-OTT-Dashboard.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend folder and add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_secret_key
PORT=5000
```

## Live Demo

Frontend:
https://personalized-ott-dashboard-nfoka8x0p-bhavani-moguluris-projects.vercel.app

GitHub Repository:
https://github.com/bhavani-moguluri/Personalized-OTT-Dashboard

## Future Enhancements

* User Profile Management
* Movie Ratings and Reviews
* Advanced Filtering
* Dark/Light Theme Toggle
* Trending Movies Dashboard

## Author

Bhavani Moguluri

## License

This project is developed for educational and portfolio purposes.

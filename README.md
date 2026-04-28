# Food Ordering Web Application

A full-stack food ordering application similar to Zomato, built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based)
- Browse restaurants with filters and sorting
- Restaurant menu with categories
- Shopping cart functionality
- Order placement with COD payment
- Order history and tracking
- Multiple delivery address management

## Tech Stack

**Frontend:**
- React (Hooks + Functional Components)
- React Router DOM
- Axios
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (already provided):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-ordering
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
```

Make sure MongoDB is running, then seed the database:
```bash
npm run seed
```

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Sign up for a new account or login
3. Browse restaurants and apply filters
4. Click on a restaurant to view menu
5. Add items to cart
6. Go to cart and add delivery address
7. Place order with Cash on Delivery
8. View order history in Orders page

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with filters)
- `GET /api/restaurants/:id` - Get restaurant by ID

### Menu
- `GET /api/menu/restaurant/:restaurantId` - Get menu by restaurant
- `GET /api/menu/item/:id` - Get menu item by ID

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

### User Addresses
- `GET /api/users/addresses` - Get user addresses (protected)
- `POST /api/users/addresses` - Add new address (protected)
- `PUT /api/users/addresses/:addressId` - Update address (protected)
- `DELETE /api/users/addresses/:addressId` - Delete address (protected)

## Project Structure

```
/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seed/            # Database seeding
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # Context providers
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── App.js       # Main app
│
└── README.md
```

## Sample Data

The seed script creates 8 restaurants with various cuisines and 5 menu items per restaurant. All sample data includes:
- Restaurant images
- Menu item images
- Veg/Non-veg indicators
- Ratings and delivery times
- Multiple price ranges

## Payment

Currently supports Cash on Delivery (COD) only.

## License

MIT

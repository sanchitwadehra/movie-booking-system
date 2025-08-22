# Movie Booking System

A full-stack web application similar to BookMyShow, built as part of a hiring assignment. This project demonstrates the ability to design a robust backend, create an interactive frontend, and solve common challenges found in real-world applications.

## 🎯 Live Demo

The application is deployed and accessible at: **[Add your deployment URL here]**

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - NoSQL database and ODM
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Validator** - Input validation
- **Cookie-parser** - Cookie handling

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Validator** - Client-side validation

## ✅ Features Implemented

### Core Requirements (All Implemented)

#### Backend API
- ✅ **User Management**: User registration/login with JWT authentication
- ✅ **Cinema Management**: CRUD operations for cinemas
- ✅ **Screen Management**: Multiple screens per cinema with fixed 10x10 seat layout
- ✅ **Movie Management**: Movie listings and details
- ✅ **Show Management**: Showtimes with date/time scheduling
- ✅ **Booking Management**: Seat selection and booking confirmation
- ✅ **Sample Data Generation**: Admin endpoint to populate test data

#### Frontend User Flow
- ✅ **Cinema & Show Listing**: Browse cinemas and available movies with showtimes
- ✅ **Seat Selection Screen**: Interactive 10x10 seat grid with visual indicators
- ✅ **Maximum 6 Seats**: Enforced seat selection limit
- ✅ **Booking Confirmation**: "Pay Now" button with booking finalization
- ✅ **Booking History**: User dashboard showing past bookings with detailed information

### Bonus Features Implemented

#### Admin Panel
- ✅ **Secure Admin Interface**: Admin-only routes with authentication middleware
- ✅ **Content Management**: Add/edit movies, cinemas, screens, and shows
- ✅ **Sample Data Generation**: Bulk data creation for testing

#### Enhanced User Experience
- ✅ **Authentication Flow**: Seamless login/register with session persistence
- ✅ **Route Protection**: Protected routes with authentication checks
- ✅ **Responsive Design**: Mobile-first design with dark/light theme support
- ✅ **Date Selection**: Pick specific dates for show availability
- ✅ **City Selection**: Choose from available cities (Chandigarh, Mohali)
- ✅ **Caching**: Redux-based caching for improved performance
- ✅ **Error Handling**: Comprehensive error handling with user feedback
- ✅ **Loading States**: Loading indicators throughout the application

## 🗃️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  isAdmin: Boolean (default: false),
  bookings: [ObjectId] (ref: Booking),
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Movie Model
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  description: String (required),
  image: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Cinema Model
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  city: String (required, lowercase),
  screens: [ObjectId] (ref: Screen),
  createdAt: Date,
  updatedAt: Date
}
```

### Screen Model
```javascript
{
  _id: ObjectId,
  screenNumber: Number (required),
  totalSeats: Number (required, default: 100),
  shows: [ObjectId] (ref: Show),
  createdAt: Date,
  updatedAt: Date
}
```

### Show Model
```javascript
{
  _id: ObjectId,
  movieId: ObjectId (ref: Movie, required),
  showtime: Date (required),
  seatsBooked: [String] (array of seat IDs like "A1", "B2"),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  show: ObjectId (ref: Show, required),
  seatsBooked: [String] (array of seat IDs),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-booking-system.git
   cd movie-booking-system
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/movie-booking-system
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-booking-system

# JWT Secrets (Generate secure random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Cookie Configuration
NODE_DEP_SAMESITE=lax
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_PROXY_DOMAIN=http://localhost:8000
```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:8000`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Generate Sample Data** (Optional)
   
   To populate the database with sample data for testing:
   - First, create an admin user by registering normally
   - Update the user's `isAdmin` field to `true` in MongoDB
   - Make a POST request to `/api/v1/admin/generate-sample-data`
   
   Or use the following curl command:
   ```bash
   curl -X POST http://localhost:8000/api/v1/admin/generate-sample-data \
   -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /` - Login/Register user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user

### User Routes (`/api/v1/user`)
- `GET /` - Get current user details

### Database Routes (`/api/v1/db`)
- `GET /movies` - Get all movies with active shows
- `POST /screens` - Get cinemas and showtimes for a movie
- `POST /show` - Get specific show details

### Booking Routes (`/api/v1/booking`)
- `POST /pay-now` - Book seats for a show
- `GET /get-bookings` - Get user's booking history

### Admin Routes (`/api/v1/admin`)
- `POST /movie` - Add new movie
- `POST /cinema` - Add new cinema
- `POST /screen` - Add new screen
- `POST /show` - Add new show
- `POST /generate-sample-data` - Generate sample data

## 🎮 Usage Guide

### For End Users

1. **Browse Movies**: Visit the homepage and click "Get Tickets" to see available movies
2. **Select City**: Choose between Chandigarh or Mohali
3. **Pick Date & Cinema**: Select your preferred date and cinema
4. **Choose Showtime**: Click on available showtimes
5. **Select Seats**: Choose up to 6 seats from the interactive seat map
6. **Login/Register**: Authenticate to proceed with booking
7. **Confirm Booking**: Click "Pay Now" to finalize your booking
8. **View History**: Check your bookings in the "Bookings" section

### For Administrators

1. **Admin Access**: Ensure your user account has `isAdmin: true`
2. **Generate Data**: Use the generate-sample-data endpoint to populate test data
3. **Manage Content**: Use admin endpoints to add movies, cinemas, screens, and shows

## 🏗️ Project Structure

```
movie-booking-system/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Authentication & error handling
│   │   ├── utils/           # Helper functions
│   │   ├── db/              # Database connection
│   │   ├── app.js           # Express app configuration
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store & slices
│   │   ├── api/             # API client configuration
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── .env
└── README.md
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **HTTP-Only Cookies**: Secure token storage
- **CORS Protection**: Configured for specific origins
- **Helmet Middleware**: Security headers
- **Input Validation**: Server and client-side validation
- **Admin Authorization**: Role-based access control

## 🚦 Error Handling

- **Global Error Middleware**: Centralized error handling
- **API Error Responses**: Consistent error format
- **Client Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback
- **Validation Errors**: Detailed validation feedback

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tailwind CSS**: Utility-first responsive design
- **Dark/Light Theme**: Automatic system theme detection
- **Touch-Friendly**: Optimized for touch interactions

## 🔄 State Management

- **Redux Toolkit**: Modern Redux with simplified syntax
- **Redux Persist**: Automatic state persistence
- **Normalized State**: Efficient data structure
- **Caching Strategy**: Performance optimization

## 🧪 Development Features

- **Hot Module Replacement**: Fast development with Vite
- **ESLint**: Code quality and consistency
- **Environment Variables**: Separate dev/prod configurations
- **CORS Proxy**: Development API proxying
- **Error Boundaries**: Graceful error handling

## 📝 Git Commit History

The project follows proper Git practices with meaningful commit messages. Each feature has been committed individually for easy tracking. Check the commit history to see the development progression:

- Initial project setup and structure
- Authentication system implementation
- Database models and API development
- Frontend components and pages
- Booking system integration
- Admin panel development
- UI/UX improvements and responsive design
- Performance optimizations and caching

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Create a new project on Railway or Heroku
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically on push to main branch

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update MONGODB_URI in environment variables
3. Ensure network access is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Commit with meaningful messages
6. Push to your fork
7. Create a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sanchit Wadehra**

This project was developed as part of a hiring assignment to demonstrate full-stack development skills, including backend API design, frontend user experience, and modern web development practices.

---

**Assignment Requirements Status:**
- ✅ All minimum requirements implemented
- ✅ Additional bonus features added
- ✅ Clean, maintainable code structure
- ✅ Proper Git commit history
- ✅ Comprehensive documentation
- ✅ Production-ready deployment configuration
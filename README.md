# Movie Booking System

A full-stack web application similar to BookMyShow, built as part of a hiring assignment. This project demonstrates the ability to design a robust backend, create an interactive frontend, and solve common challenges found in real-world applications.

## 🎯 Live Demo

The application is deployed and accessible at:
- **Frontend**: [mbs-frontend-ten.vercel.app](https://mbs-frontend-ten.vercel.app)
- **Backend API**: [mbs-backend-6b7la.ondigitalocean.app](https://mbs-backend-6b7la.ondigitalocean.app)

### 🎥 Video Walkthrough
Watch a 90-second overview of the complete user flow: **[Application Demo Video](https://drive.google.com/file/d/1SbCjHwgwlLr0c0WYZRWa7dGg__PxFWMr/view?usp=sharing)**

You can try out the admin features using these credentials:
- **Email**: `abc@email.com`
- **Password**: `Abc@1234`

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - NoSQL database and ODM
- **JWT** - Authentication and authorization
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting and throttling
- **Validator** - Input validation
- **Cookie-parser** - Cookie handling
- **node-cron** - Automated task scheduling

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
- ✅ **Sample Data Generation**: Admin endpoint to populate test data with current dates

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
- ✅ **Sample Data Generation**: Bulk data creation with dynamic dates for testing
- ✅ **Automated Data Refresh**: Cron job automatically refreshes sample data every 2 days at midnight IST

#### Enhanced User Experience
- ✅ **Authentication Flow**: Seamless login/register with session persistence
- ✅ **Seat Selection Persistence**: Automatically saves and restores seat selection when users are redirected to login
- ✅ **Route Protection**: Protected routes with authentication checks
- ✅ **Responsive Design**: Mobile-first design with dark/light theme support
- ✅ **Date Selection**: Pick specific dates for show availability
- ✅ **City Selection**: Choose from available cities (Chandigarh, Mohali)
- ✅ **Smart Filtering**: Automatically filters out past shows to display only available showtimes
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
   git clone https://github.com/sanchitwadehra/movie-booking-system.git
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

# Cron Jobs Configuration
# Set to 'true' to enable automated cron jobs (sample data refresh every 2 days)
# Set to 'false' or omit to disable cron jobs
ENABLE_CRON=false
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
   - **Note**: Sample data automatically uses current date and next two days for showtimes (three consecutive days total)
   - **Important**: This operation clears all existing bookings and resets user booking history for a clean testing environment
   
   Or use the following curl command:
   ```bash
   curl -X POST http://localhost:8000/api/v1/admin/generate-sample-data \
   -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```

## 📡 API Endpoints

### Postman Collection
You can test all API endpoints using our comprehensive Postman collection:
**[Movie Booking System API Collection](https://www.postman.com/aviation-participant-82153467/movie-booking-system/collection/lxv7wy6/mbs-backend?action=share&creator=37702018)**

### Authentication Routes (`/api/v1/auth`)
- `POST /` - Login/Register user *(Login Rate Limited: 15/15min)*
- `POST /refresh` - Refresh access token *(Public Rate Limited: 50/15min)*
- `POST /logout` - Logout user *(Authenticated Rate Limited: 25/15min)*

### User Routes (`/api/v1/user`)
- `GET /` - Get current user details *(Authenticated Rate Limited: 25/15min)*

### Database Routes (`/api/v1/db`)
- `GET /movies` - Get all movies with active future shows *(Public Rate Limited: 50/15min)*
- `POST /screens` - Get cinemas and showtimes for a movie (future shows only) *(Public Rate Limited: 50/15min)*
- `POST /show` - Get specific show details (validates show is still available) *(Public Rate Limited: 50/15min)*

### Booking Routes (`/api/v1/booking`)
- `POST /pay-now` - Book seats for a show *(Authenticated Rate Limited: 25/15min)*
- `GET /get-bookings` - Get user's booking history *(Authenticated Rate Limited: 25/15min)*

### Admin Routes (`/api/v1/admin`)
- `POST /movie` - Add new movie *(Authenticated Rate Limited: 25/15min)*
- `POST /cinema` - Add new cinema *(Authenticated Rate Limited: 25/15min)*
- `POST /screen` - Add new screen *(Authenticated Rate Limited: 25/15min)*
- `POST /show` - Add new show *(Authenticated Rate Limited: 25/15min)*
- `POST /generate-sample-data` - Generate sample data with clean state (clears existing bookings) *(Authenticated Rate Limited: 25/15min)*
- `POST /trigger-cron-refresh` - Manually trigger cron data refresh (for testing) *(Authenticated Rate Limited: 25/15min)*

### Health Check Routes (`/api/v1/health`)
- `GET /` - Health check endpoint *(Public Rate Limited: 50/15min)*

## 🎮 Usage Guide

### For End Users

1. **Browse Movies**: Visit the homepage and click "Start Booking Now" to see available movies
2. **Select City**: Choose between Chandigarh or Mohali
3. **Pick Date & Cinema**: Select your preferred date and cinema
4. **Choose Showtime**: Click on available showtimes
5. **Select Seats**: Choose up to 6 seats from the interactive seat map
6. **Login/Register**: If not logged in, your seat selection is automatically saved and restored after authentication
7. **Confirm Booking**: Click "Pay Now" to finalize your booking
8. **View History**: Check your bookings in the "Bookings" section

### For Administrators

1. **Admin Access**: Ensure your user account has `isAdmin: true`
2. **Generate Data**: Use the generate-sample-data endpoint to populate test data with current dates
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
│   │   ├── store/           # Redux store & slices (auth, booking, cinema, movie, region, route)
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
- **Rate Limiting**: Multi-tier API throttling protection
  - **Login Rate Limiting**: 15 requests per 15 minutes for authentication endpoints
  - **Authenticated User Limiting**: 25 requests per 15 minutes for logged-in users
  - **Public API Limiting**: 50 requests per 15 minutes for public endpoints
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
- **Redux Persist**: Automatic state persistence for user preferences and booking data
- **Booking State**: Seat selection persistence across authentication flows
- **Normalized State**: Efficient data structure
- **Caching Strategy**: Performance optimization with automatic cleanup

## 🧪 Development Features

- **Hot Module Replacement**: Fast development with Vite
- **ESLint**: Code quality and consistency
- **Environment Variables**: Separate dev/prod configurations
- **CORS Proxy**: Development API proxying
- **Error Boundaries**: Graceful error handling

## ⏰ Automated Tasks

### Cron Jobs
The application includes automated cron jobs for maintenance tasks:

- **Sample Data Refresh**: Automatically regenerates sample data every 2 days at midnight IST
  - **Schedule**: `30 18 */2 * *` (Every 2 days at 18:30 UTC = 12:00 AM IST)
  - **Purpose**: Ensures sample data always contains current and future show dates
  - **Scope**: Clears and regenerates all movies, cinemas, screens, shows, and bookings
  - **Architecture**: Reuses existing admin controller logic for consistency
  - **Environment Control**: 
    - **Disabled by default**: Set `ENABLE_CRON=true` to enable in any environment
    - **Manual Control**: Only runs when explicitly enabled via environment variable

### Cron Job Benefits
- **Always Fresh Data**: Sample data never becomes outdated with past showtimes
- **Zero Maintenance**: No manual intervention required to keep demo data current
- **Clean State**: Each refresh provides a clean testing environment
- **Explicit Control**: Only runs when explicitly enabled, giving full control over automation
- **DRY Architecture**: Reuses existing sample data logic, eliminating code duplication
- **Consistent Behavior**: API endpoints and cron jobs use identical data generation logic

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

### Backend (Digital Ocean)
1. Create a new App on Digital Ocean
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
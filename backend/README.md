# Royal Business Machine - Backend API

A comprehensive Node.js/Express backend API for the Royal Business Machine corporate website with lead generation, client dashboard, payment integration, and content management.

## 🚀 Features

- **Authentication System**: JWT-based authentication with OTP verification
- **Lead Management**: Capture and manage business leads with email notifications
- **Services Management**: CRUD operations for company services with image uploads
- **Portfolio Management**: Showcase projects with multi-image support
- **Contact System**: Handle customer inquiries with admin notifications
- **Payment Integration**: Razorpay integration with invoice generation
- **Admin Dashboard**: Statistics, analytics, and user management
- **Security**: Helmet.js, rate limiting, input validation, and CORS protection

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Razorpay account (for payment integration)
- Gmail account (for email notifications)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Update the following in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `JWT_REFRESH_SECRET`: A strong secret key for refresh tokens
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASSWORD`: Your Gmail app password ([Get it here](https://support.google.com/accounts/answer/185833))
   - `RAZORPAY_KEY_ID`: Your Razorpay key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay key secret
   - `FRONTEND_URL`: Your frontend URL (default: http://localhost:3000)

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── multer.js            # File upload configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── leadController.js    # Lead management
│   ├── serviceController.js # Services CRUD
│   ├── portfolioController.js # Portfolio CRUD
│   ├── contactController.js # Contact form handling
│   ├── paymentController.js # Payment processing
│   └── adminController.js   # Admin operations
├── middleware/
│   ├── auth.js              # JWT verification & RBAC
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Request validation
├── models/
│   ├── User.js              # User schema
│   ├── OTP.js               # OTP schema
│   ├── Lead.js              # Lead schema
│   ├── Service.js           # Service schema
│   ├── Portfolio.js         # Portfolio schema
│   ├── Contact.js           # Contact schema
│   └── Payment.js           # Payment schema
├── routes/
│   ├── auth.js              # Auth routes
│   ├── leads.js             # Lead routes
│   ├── services.js          # Service routes
│   ├── portfolio.js         # Portfolio routes
│   ├── contact.js           # Contact routes
│   ├── payments.js          # Payment routes
│   └── admin.js             # Admin routes
├── services/
│   ├── emailService.js      # Email sending
│   ├── otpService.js        # OTP generation & verification
│   ├── paymentService.js    # Razorpay integration
│   └── pdfService.js        # PDF generation
├── utils/
│   └── helpers.js           # Utility functions
├── uploads/                 # Uploaded files directory
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
└── server.js                # Application entry point
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Leads
- `POST /api/leads` - Create new lead (Public)
- `GET /api/leads` - Get all leads (Admin)
- `GET /api/leads/stats` - Get lead statistics (Admin)
- `GET /api/leads/:id` - Get lead by ID (Admin)
- `PATCH /api/leads/:id` - Update lead (Admin)
- `DELETE /api/leads/:id` - Delete lead (Admin)

### Services
- `GET /api/services` - Get all services (Public)
- `GET /api/services/:slug` - Get service by slug (Public)
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items (Public)
- `GET /api/portfolio/:slug` - Get portfolio item by slug (Public)
- `POST /api/portfolio` - Create portfolio item (Admin)
- `PUT /api/portfolio/:id` - Update portfolio item (Admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (Admin)

### Contact
- `POST /api/contact` - Submit contact form (Public)
- `GET /api/contact` - Get all contacts (Admin)
- `GET /api/contact/:id` - Get contact by ID (Admin)
- `PATCH /api/contact/:id` - Update contact (Admin)
- `DELETE /api/contact/:id` - Delete contact (Admin)

### Payments
- `POST /api/payments/create-order` - Create payment order (Client)
- `POST /api/payments/verify` - Verify payment (Client)
- `GET /api/payments/history` - Get payment history (Client/Admin)
- `GET /api/payments/:id` - Get payment by ID (Client/Admin)
- `GET /api/payments/invoice/:id` - Download invoice (Client/Admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics (Admin)
- `GET /api/admin/analytics` - Analytics data (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/users/:id` - Get user by ID (Admin)
- `PATCH /api/admin/users/:id/role` - Update user role (Super Admin)
- `PATCH /api/admin/users/:id/status` - Toggle user status (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Super Admin)

## 🔑 User Roles

- **client**: Regular users who can make payments and manage their profile
- **admin**: Can manage leads, services, portfolio, contacts, and view analytics
- **super_admin**: Full access including user management and role assignment

## 📧 Email Configuration

To enable email notifications, you need to configure Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in `.env` as `EMAIL_PASSWORD`

## 💳 Payment Configuration

To enable Razorpay payments:

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard → Settings → API Keys
3. Add keys to `.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

## 🧪 Testing

### Test Authentication Flow
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123",
    "phone": "9876543210"
  }'

# Verify OTP (check your email for OTP)
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Test Lead Submission
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "company": "ABC Corp",
    "service": "Web Development",
    "message": "Need a website for my business"
  }'
```

## 🚨 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet.js**: Security headers
- **CORS**: Configured for frontend origin
- **Input Validation**: express-validator for all inputs
- **OTP Expiry**: 5-minute expiration for OTPs
- **File Upload Limits**: 5MB max file size

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `JWT_REFRESH_SECRET` | Refresh token secret | - |
| `JWT_REFRESH_EXPIRE` | Refresh token expiration | 30d |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | Email address | - |
| `EMAIL_PASSWORD` | Email app password | - |
| `EMAIL_FROM` | From email address | - |
| `OTP_EXPIRE` | OTP expiration (minutes) | 5 |
| `RAZORPAY_KEY_ID` | Razorpay key ID | - |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | - |
| `FRONTEND_URL` | Frontend URL | http://localhost:3000 |
| `MAX_FILE_SIZE` | Max file upload size (bytes) | 5242880 |
| `UPLOAD_PATH` | Upload directory path | ./uploads |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2FA is enabled on Gmail
- Ensure less secure app access is disabled (use app passwords instead)

### File Upload Issues
- Check `uploads/` directory exists and has write permissions
- Verify file size is under 5MB
- Ensure file type is allowed (images and PDFs only)

## 📄 License

ISC

## 👨‍💻 Author

Royal Business Machine

---

**Note**: Remember to update all sensitive credentials in `.env` before deploying to production!

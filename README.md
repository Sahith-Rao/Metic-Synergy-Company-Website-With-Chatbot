# 🚀 Metic Synergy - Digital Excellence Redefined

<div align="center">
  
![Metic Synergy](public/logo.png)

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styled-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![AI Powered](https://img.shields.io/badge/AI-Powered%20by%20Cohere-FF6F61?style=flat-square)](https://cohere.com/)
[![Vector DB](https://img.shields.io/badge/Vector%20DB-Pinecone-00C9A7?style=flat-square)](https://www.pinecone.io/)

</div>

## ✨ Overview

Metic Synergy is a cutting-edge digital agency platform built with modern web technologies. Our platform showcases our expertise in digital transformation, creative design, and technical innovation through an immersive and interactive user experience.

**Featured Innovation:** MetaGrow AI - an intelligent chatbot powered by RAG (Retrieval Augmented Generation) technology that provides instant, accurate answers about our services, qualifies leads, and seamlessly escalates to human support when needed.

## 🎯 Key Features

### 🎨 Modern Design System
- Sleek, minimalist interface with dynamic animations
- Responsive layout for all devices
- Custom gradient effects and glass-morphism
- Interactive hover states and transitions

### 🤖 AI-Powered Chatbot
- MetaGrow AI with RAG (Retrieval Augmented Generation)
- Context-aware responses from website knowledge base
- Intelligent lead qualification and support escalation
- Powered by Cohere AI and Pinecone vector database

### 📅 Appointment Booking
- **User-friendly appointment scheduling**: Intuitive booking modal with calendar and time selection
- **Service selection interface**: Choose from available services
- **Time slot picker**: Select preferred date and time
- **Email Confirmation**: Automatic email sent upon successful booking with appointment date, time, service booked, and personalized message
- **Email Service**: Powered by Nodemailer with Gmail integration
- **Error Handling**: Graceful handling of email delivery failures while still saving bookings

### 📊 Survey & Analytics System
- **Interactive Survey**: Users can fill out a comprehensive 7-question digital marketing survey
- **Survey Flow**: Initial form → Survey questions → Submission → Thank you page
- **Data Collection**: Captures user insights about marketing challenges, ROI confidence, online presence, and more
- **Response Storage**: All survey responses are securely stored in MongoDB

### 👨‍💼 Admin Dashboard
- **Secure Authentication**: JWT-based admin login system with bcrypt password hashing
- **Protected Routes**: Admin dashboard requires authentication to access
- **Two Main Tabs**:
  - **Upcoming Appointments**: View all scheduled appointments with client details, dates, times, and services
  - **Survey Database**: Visual analysis of all survey responses with interactive charts

### 📈 Visual Analysis Features
- **Interactive Charts**: Bar charts and pie charts for survey question responses
- **Chart Types**: Toggle between bar and pie chart visualizations
- **Clickable Analytics**: Click on any chart segment to view users who selected that option
- **User Details Modal**: View individual user responses and contact information
- **Real-time Data**: Live statistics from survey database
- **Responsive Design**: Charts adapt to different screen sizes using Recharts

### ⚡ Performance Optimized
- Vite for lightning-fast development and builds
- Efficient component architecture
- Lazy loading and code splitting
- Optimized assets and images

## 🎨 Features & Pages

### 🏠 Home Page
- Dynamic hero section with parallax effects
- Animated service cards
- Client testimonials with carousel
- Interactive project showcase

### 📞 Contact Page
- Team member profiles with hover effects
- Interactive contact cards
- Integrated booking system
- Location information with map

### 📅 Booking System
- **User-friendly appointment scheduling**: Intuitive booking modal with calendar and time selection
- **Service selection interface**: Choose from available services
- **Time slot picker**: Select preferred date and time
- **Email Confirmation**: Automatic email sent upon successful booking
- **Confirmation Details**: Email includes appointment date, time, service, and personalized message

#### Booking Flow
1. User clicks "Book Appointment" button (available throughout the site)
2. Booking modal opens with form fields
3. User fills in: Name, Email, Phone, Company, Service, Date, and Time
4. Form submission saves booking to MongoDB
5. **Email confirmation is automatically sent** to user's email address
6. User receives confirmation with all appointment details

### 📝 Survey System

#### Survey Flow
1. **Initial Form** (`/initial-form`): User enters name and email
2. **Survey Page** (`/survey`): User answers 7 questions about digital marketing
3. **Submission**: Survey responses saved to database
4. **Completion**: User redirected to thank you/video page

#### Survey Questions
The survey includes 7 comprehensive questions:
1. How many sources have you tried to improve your online presence?
2. What's your biggest challenge with digital marketing?
3. How much time do you spend managing your social media accounts every week?
4. How confident are you in your current ad campaigns' ROI?
5. How much of your website traffic comes from organic search (SEO)?
6. How would you describe your brand's online presence?
7. How much revenue do you generate from your online marketing efforts?

#### Survey Features
- **Radio button selection** for each question
- **Form validation** ensures all questions are answered
- **Data persistence** saves responses to MongoDB
- **Error handling** with user-friendly error messages
- **Visual feedback** with styled selection states

### 🔐 Admin Dashboard (`/admin/dashboard`)

#### Admin Login (`/admin/login`)
- **Secure Authentication**: Username and password login
- **JWT Token**: Secure token-based authentication
- **Session Management**: Token stored in localStorage
- **Protected Access**: Dashboard routes require valid token

#### Dashboard Features

**1. Upcoming Appointments Tab**
- **Appointment List**: View all upcoming appointments sorted by date and time
- **Appointment Details**: 
  - Client name and company
  - Date and time (formatted for readability)
  - Service booked
  - Contact information (email and phone)
- **Interactive Elements**: Click email/phone to contact clients directly
- **Filtering**: Only shows appointments from today onwards
- **Empty State**: Friendly message when no appointments are scheduled

**2. Survey Database Tab**
- **Visual Analytics**: Interactive charts showing survey response statistics
- **Question Breakdown**: Separate chart for each of the 7 survey questions
- **Chart Types**: 
  - **Bar Charts**: Horizontal bar visualization with customizable colors
  - **Pie Charts**: Circular pie visualization for percentage breakdown
- **Interactive Features**:
  - Click on chart segments/bars to view users who selected that option
  - Hover effects highlight selected data points
  - Toggle between bar and pie chart views
- **User Details Modal**: 
  - View all users who selected a specific answer
  - Display user name and email
  - Scrollable list for multiple users
- **Statistics Display**: 
  - Total response count per option
  - Visual cards showing option text and response count
  - Color-coded chart segments

#### Admin Features
- **Protected Routes**: Admin-only access with authentication
- **Real-time Data**: Live updates from MongoDB
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Graceful error messages and loading states

### 🤖 MetaGrow AI Chatbot
- **RAG-Powered Intelligence**: Retrieval Augmented Generation for accurate, context-aware responses
- **Smart Context Understanding**: Analyzes user queries against website content, documentation, and company knowledge base
- **Multi-Step Conversations**: Guides users through business analysis, service suggestions, and consultation booking
- **Automatic Support Escalation**: Seamlessly connects users with the team when advanced assistance is needed
- **Lead Qualification**: Intelligently gathers business information and contact details
- **Real-time Responses**: Fast, conversational AI powered by Cohere's latest models
- **Knowledge Base Integration**: Auto-indexes site pages, components, and documentation for comprehensive answers

#### Using the Chatbot
The chatbot can help with:
- **Service Information**: "What digital marketing services do you offer?"
- **Company Details**: "Who are the founders of Metic Synergy?"
- **Technical Questions**: "How does your content creation process work?"
- **Lead Generation**: Automatically detects business needs and qualifies leads
- **Support Requests**: Keywords like "pricing", "quote", "custom" trigger human escalation
- **Contact Collection**: Intelligently requests contact info when needed

## 🛠️ Built With

### Frontend
- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon system
- [Recharts](https://recharts.org/) - Chart library for admin dashboard
- [Headless UI](https://headlessui.com/) - Accessible UI components

### Backend & AI
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database for bookings, surveys, and admin
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [JWT](https://jwt.io/) - Authentication tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [Nodemailer](https://nodemailer.com/) - Email service
- [Cohere AI](https://cohere.com/) - Language models and embeddings
- [Pinecone](https://www.pinecone.io/) - Vector database for RAG

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens
- 📺 Large displays

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Environment Variables

#### Backend (`.env`)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=your_mongodb_connection_string

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Authentication
JWT_SECRET=your_jwt_secret_key

# Email Service (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
SUPPORT_EMAIL=support@example.com

# AI Services
COHERE_API_KEY=your_cohere_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
OPENAI_API_KEY=your_openai_api_key
```

#### Frontend (`.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/sreevallabh04/metic-synergy.git
cd metic-synergy
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
   - Copy `.env.example` to `.env` in both `backend` and `frontend` directories
   - Fill in all required environment variables

5. **Create admin user**
```bash
cd backend
node createAdmin.js
```
This will create an admin user with username `admin` and password `yourSecurePassword` (change in `createAdmin.js` before running).

6. **Start the backend server**
```bash
cd backend
npm start
```

7. **Start the frontend development server**
```bash
cd frontend
npm run dev
```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:5173/admin/login

### Docker Deployment

The project includes Docker Compose configuration for easy deployment:

```bash
docker-compose up -d
```

This will start both frontend and backend services in containers.

## 📧 Email Configuration

The email confirmation system uses Nodemailer with Gmail. To set up:

1. **Gmail App Password**:
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password for "Mail"
   - Use this password in `EMAIL_PASS` environment variable

2. **Email Template**: 
   - Located in `backend/services/emailService.js`
   - Includes appointment details, branding, and professional formatting
   - Supports both HTML and plain text formats

## 🗄️ Database Models

### Booking Model
- `name`: String (required)
- `phone`: String (required)
- `email`: String (required)
- `date`: String (required)
- `time`: String (required)
- `company`: String (required)
- `service`: String (required)

### SurveyResponse Model
- `name`: String (required)
- `email`: String (required)
- `answers`: Object (required) - Contains question IDs and selected options
- `createdAt`: Date (auto-generated)

### Admin Model
- `username`: String (required, unique)
- `password`: String (required, hashed with bcrypt)

## 🧠 AI Chatbot Technical Architecture

### How MetaGrow AI Works

The chatbot leverages a sophisticated RAG (Retrieval Augmented Generation) pipeline:

1. **Knowledge Ingestion**
   - Automatically indexes all website pages, components, and documentation
   - Chunks content into semantic segments with configurable overlap
   - Generates embeddings using Cohere's `embed-english-v3.0` model
   - Stores vectors in Pinecone for fast similarity search

2. **Query Processing**
   - User queries are embedded in real-time
   - Performs vector similarity search to retrieve top-k relevant contexts
   - Dynamically boosts specific contexts (e.g., founder info) based on query patterns
   - Handles keyword-based escalation for pricing, quotes, and custom requests

3. **Response Generation**
   - Uses Cohere's `command-a-03-2025` model for natural language generation
   - System prompt constrains responses to be concise (1-3 sentences)
   - Answers strictly from retrieved context to prevent hallucinations
   - Implements rate limiting and exponential backoff for API stability

4. **Smart Escalation**
   - Detects when answers are unavailable or user needs human support
   - Automatically collects contact information (name, email, phone)
   - Triggers email notifications to support team via `supportEmail` service
   - Maintains conversation context for seamless handoff

5. **Conversation Management**
   - Multi-step conversation flow: greeting → analyzing → suggestion → budget → lead
   - Extracts user data (business niche, website URL, social links, budget)
   - Contextual state management using React Context API
   - Persistent chat history within session

## 📊 API Endpoints

### Public Endpoints
- `POST /api/bookings` - Create a new booking (sends email confirmation)
- `POST /api/survey-responses` - Submit survey responses
- `POST /api/rag/query` - Query the AI chatbot
- `GET /api/health` - Health check endpoint

### Protected Endpoints (Admin)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/appointments` - Get all upcoming appointments
- `GET /api/admin/survey-stats` - Get survey statistics
- `GET /api/admin/survey-responses/:questionId/:option` - Get users by survey answer

## 🔐 Security Features

- **JWT Authentication**: Secure token-based admin authentication
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **CORS Configuration**: Restricted cross-origin resource sharing
- **Security Headers**: XSS protection, content type options, frame options
- **Protected Routes**: Authentication required for admin dashboard
- **Input Validation**: Server-side validation for all user inputs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 📞 Contact

Metic Synergy - [srivallabhkakarala@gmail.com](mailto:srivallabhkakarala@gmail.com)

Project Link: [https://github.com/sreevallabh04/metic-synergy](https://github.com/sreevallabh04/metic-synergy)

---

<div align="center">
  
Made with ❤️ by Metic Synergy

</div>

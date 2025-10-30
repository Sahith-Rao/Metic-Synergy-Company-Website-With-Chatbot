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

- **🎨 Modern Design System**
  - Sleek, minimalist interface with dynamic animations
  - Responsive layout for all devices
  - Custom gradient effects and glass-morphism
  - Interactive hover states and transitions

- **🤖 AI-Powered Chatbot**
  - MetaGrow AI with RAG (Retrieval Augmented Generation)
  - Context-aware responses from website knowledge base
  - Intelligent lead qualification and support escalation
  - Powered by Cohere AI and Pinecone vector database

- **⚡ Performance Optimized**
  - Vite for lightning-fast development and builds
  - Efficient component architecture
  - Lazy loading and code splitting
  - Optimized assets and images

- **🛠️ Technical Stack**
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Lucide icons for consistent iconography
  - Node.js + Express backend
  - MongoDB for data persistence



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
- User-friendly appointment scheduling
- Service selection interface
- Time slot picker
- Confirmation system

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

### Backend & AI
- [Node.js](https://nodejs.org/) - Runtime environment
- [Express](https://expressjs.com/) - Web framework
- [Cohere AI](https://cohere.com/) - Language models and embeddings
- [Pinecone](https://www.pinecone.io/) - Vector database for RAG
- [MongoDB](https://www.mongodb.com/) - Database for bookings and surveys

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens
- 📺 Large displays

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


## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 📞 Contact

Metic Synergy - [srivallabhkakarala@gmail.com](mailto:srivallabhkakarala@gmail.com)

Project Link: [https://github.com/sreevallabh04/metic-synergy](https://github.com/sreevallabh04/metic-synergy)

---

<div align="center">
  
Made with ❤️ by Metic Synergy

</div> 

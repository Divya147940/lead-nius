# Lead Genius - SaaS Platform

A premium SaaS platform built with Next.js and FastAPI.

## Tech Stack

- **Frontend**: Next.js (React), Vanilla CSS (Premium Glassmorphism Design)
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL
- **Payments**: Razorpay Integration

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.9+)
- PostgreSQL

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd my-app
   npm install
   ```
3. Setup the backend:
   ```bash
   cd fastapi-backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Running the Application

Each service can be run separately according to user preference:

#### Option 1: Run Separately (Recommended)
- **Frontend**: `cd my-app && npm run dev` (Available at `http://localhost:3000`)
- **Backend**: `cd fastapi-backend && .\venv\Scripts\uvicorn main:app --port 5000 --reload` (Available at `http://localhost:5000`)

#### Option 2: Run Concurrently from Root
1. Install root dev dependencies:
   ```bash
   npm install
   ```
2. Run both:
   ```bash
   npm run dev
   ```

## Features

- **Dynamic Catalog**: Browse and filter lead generation tools.
- **Razorpay Integration**: Secure, backend-driven payment flow.
- **Responsive Registration**: Modern signup flow with database persistence.

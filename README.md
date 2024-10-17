# Tahminator

Welcome to **Tahminator**! This is a Next.js application designed for predicting soccer match scores. Compete with others, test your knowledge, and win big by making accurate predictions!

## Features

- **User Registration**: Sign up and create your account.
- **Score Predictions**: Make predictions for upcoming matches and earn points.
- **Leaderboard**: Check your standings against other users.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## Getting Started

To get started with the Tahminator application, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node package manager)
- A PostgreSQL database

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/tahminator.git
cd tahminator
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
DATABASE_URL="postgres://username:password@host:port/database?pgbouncer=true"
DIRECT_URL="postgres://username:password@host:port/database"

WEBHOOK_SECRET="your_webhook_secret"

ADMIN_TOKEN="your_admin_token"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_URL="/"

```

Make sure to replace the placeholders with your actual database connection details and webhook secret.

### Run the Development Server

Now, you can start the development server:

```bash
npm run dev
```

### Access the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action!

## Acknowledgments

Thanks for checking out Tahminator! We hope you enjoy using the app and have fun predicting scores!

# Tech Mania

Welcome to **Tech Mania**, a comprehensive platform designed for tech enthusiasts to explore tips, tricks, tutorials, and expert recommendations. This dynamic web application enables users to share insights, troubleshoot tech issues, and stay up-to-date with the latest in technology.

## Table of Contents

- [Live URL](#live-url)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [Building the Application](#building-the-application)
- [Linting and Formatting](#linting-and-formatting)
- [Technology Stack](#technology-stack)

## Live URL

Visit **Tech Mania**: [https://tech-mania.vercel.app/](https://tech-mania.vercel.app/)

## Features

### User and Admin Roles
- **User Registration**: Users can register and log in using email and password.
- **Profile Management**: Users can update profile details, view followers/following, and access a personalized "My Profile" page.
- **Verification Badge**: Verified users receive a badge, especially if they subscribe to premium features.

### Post Creation and Sharing
- **Rich Text Editor**: Users can create and edit tech tutorials with rich text formatting.
- **Image Attachments**: Add images or screenshots to posts for enhanced clarity.
- **Categorization**: Posts can be categorized by technology area (e.g., "Web," "AI") for easy discovery.
- **Premium Posts**: Premium content is available only to verified users.

### Social Features
- **Upvote/Downvote System**: Users can rate posts and comments.
- **Commenting System**: Users can comment, edit, or delete comments on posts.

### Subscription and Payment
- **Payment Gateway**: Stripe and AAMARPAY integration for premium content.
- **Subscription Model**: Access to premium content for $20/month.

### Content Sharing
- **PDF Generation**: Users can download posts as PDFs.
- **News Feed**: Users have a personalized feed of posts and updates.

### Responsive Design
- **Cross-Device Compatibility**: Optimized for desktop, tablet, and mobile devices.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or higher)
- pnpm (v6 or higher)

## Installation

### Clone the Repository

```sh
git clone https://github.com/ShuvoBaroi-DesignManiaBD/tech-mania.git
cd tech-mania
```

### Install Dependencies

```sh
pnpm install
```

### Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_BASE_API=<YOUR_BACKEND_API_URL>
NEXT_PUBLIC_URL=<YOUR_FRONTEND_URL>
JWT_ACCESS_SECRET=<YOUR_JWT_SECRET>

# Cloudinary secrets
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

# Stripe secrets
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<YOUR_STRIPE_PUBLIC_KEY>
STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>

# sslcommerze credentials
STORE_ID=<YOUR_SSL_STORE_ID>
STORE_PASSWORD=<YOUR_SSL_STORE_PASSWORD>
IS_LIVE=<TRUE_OR_FALSE>
```

## Running the Application

### Development

To run the application in development mode with hot reloading:

```sh
pnpm dev
```

### Production

1. Build the project:

   ```sh
   pnpm build
   ```

2. Start the application:

   ```sh
   pnpm start
   ```

## Building the Application

To build the project:

```sh
pnpm build
```

This will compile the files and place them in the `dist` folder.

## Linting and Formatting

To lint the code:

```sh
pnpm lint
```

To fix linting errors:

```sh
pnpm lint --fix
```

## Technology Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static generation.
- **Redux Toolkit**: State management for consistent and maintainable app structure.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Ant Design**: React component library.
- **React Hook Form**: Efficient form handling with validation.
- **Cloudinary**: Media storage and optimization.
- **Stripe / SSLCommerz**: Payment gateways for premium subscriptions.

### Backend
- **Node.js**: JavaScript runtime for backend.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for efficient data handling.
- **Mongoose**: ODM for MongoDB, providing schema-based modeling.
- **JWT**: JSON Web Token for secure user authentication.

---

#### GitHub Repositories

- **Frontend**: [https://github.com/ShuvoBaroi-DesignManiaBD/tech-mania](https://github.com/ShuvoBaroi-DesignManiaBD/tech-mania)
- **Backend**: [https://github.com/ShuvoBaroi-DesignManiaBD/tech-mania-backend](https://github.com/ShuvoBaroi-DesignManiaBD/tech-mania-backend)

---
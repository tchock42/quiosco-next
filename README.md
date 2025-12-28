# 🍔 Quiosco de Comida - Next.js Application

A modern restaurant point-of-sale (POS) system built with Next.js, featuring a customer-facing ordering interface and an admin dashboard for managing products and orders.

## 📋 Overview

Quiosco de Comida is a full-stack web application that allows customers to browse food products, add items to their cart, place orders, and track their status. Admin users can manage product catalog, monitor incoming orders, and update order statuses.

The application leverages **Next.js App Router** for routing, **Prisma** as the ORM for database operations, and **Server Components** for optimal performance.

## ✨ Features

### Customer Features
- **Product Browsing**: Browse food items organized by categories
- **Shopping Cart**: Add/remove products with quantity management using Zustand state management
- **Order Placement**: Complete orders with customer information and payment details
- **Order Tracking**: View order status and wait times in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Admin Features
- **Product Management**: Create, edit, and delete food items with image uploads
- **Category Management**: Organize products by food categories
- **Order Management**: View all customer orders with detailed information
- **Order Status Updates**: Mark orders as ready for pickup
- **Product Search**: Search and filter products for easy management
- **Product Pagination**: Navigate through large product catalogs efficiently

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI components and state management
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications for user feedback
- **Zustand** - Lightweight state management for shopping cart
- **SWR** - Data fetching and caching

### Backend & Database
- **Next.js Server Actions** - Backend operations without API routes
- **Prisma 6.13** - ORM for database management
- **PostgreSQL** - Relational database

### Utilities & Validation
- **Zod** - Schema validation for forms and API data
- **Next Cloudinary** - Image uploads and optimization
- **Heroicons** - UI icon library
- **React Icons** - Additional icon set

## 🏗️ Project Structure

```
quiosco-next/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── admin/                   # Admin dashboard routes
│   │   ├── layout.tsx
│   │   ├── orders/              # Order management
│   │   │   ├── page.tsx
│   │   │   └── api/route.ts     # Order API endpoint
│   │   └── products/            # Product management
│   │       ├── page.tsx
│   │       ├── new/             # Create new product
│   │       ├── [id]/edit/       # Edit existing product
│   │       └── search/          # Search products
│   ├── order/                   # Customer order pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [category]/page.tsx  # Products by category
│   └── orders/                  # Customer order tracking
│       ├── page.tsx
│       └── api/route.ts         # Orders API endpoint
├── actions/                      # Server actions for mutations
│   ├── create-order-actions.ts
│   ├── create-product-action.ts
│   ├── update-product-action.ts
│   └── complete-order-action.ts
├── components/                   # Reusable React components
│   ├── admin/                   # Admin-specific components
│   │   ├── AdminRoute.tsx       # Admin authentication guard
│   │   └── AdminSidebar.tsx     # Navigation sidebar
│   ├── order/                   # Order-related components
│   │   ├── LatestOrderItem.tsx
│   │   ├── OrderCard.tsx
│   │   ├── OrderCardButton.tsx
│   │   ├── OrderSidebar.tsx
│   │   ├── OrderSummary.tsx
│   │   └── ProductDetails.tsx
│   ├── products/                # Product management components
│   │   ├── AddProductButton.tsx
│   │   ├── AddProductForm.tsx
│   │   ├── EditProductForm.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductSearchForm.tsx
│   │   ├── ProductsPagination.tsx
│   │   └── ProductTable.tsx
│   └── ui/                      # Shared UI components
│       ├── CategoryIcon.tsx
│       ├── GoBackButton.tsx
│       ├── Heading.tsx
│       ├── Logo.tsx
│       └── ToastNotification.tsx
├── prisma/                       # Database configuration
│   ├── schema.prisma            # Data models
│   ├── seed.ts                  # Database seeding script
│   ├── migrations/              # Database migrations
│   └── data/                    # Seed data
│       ├── categories.ts
│       └── products.ts
├── src/
│   ├── store.ts                 # Zustand store configuration
│   ├── lib/
│   │   ├── prisma.ts            # Prisma client instance
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript type definitions
│   │   └── utils/
│   │       └── index.ts         # Utility functions
│   └── schema/
│       └── index.ts             # Zod validation schemas
└── public/                       # Static assets
    └── products/                # Product images
```

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

### Category
- `id` (Int, Primary Key)
- `name` (String)
- `slug` (String)
- `products` (Relation to Product)

### Product
- `id` (Int, Primary Key)
- `name` (String)
- `price` (Float)
- `image` (String) - Cloudinary URL
- `categoryId` (Int, Foreign Key)
- `category` (Relation to Category)
- `orderItems` (Relation to OrderProducts)

### Order
- `id` (Int, Primary Key)
- `name` (String) - Customer name
- `total` (Float) - Order total amount
- `date` (DateTime) - Order creation timestamp
- `status` (Boolean) - Ready for pickup status
- `orderReadyAt` (DateTime, Optional) - Pickup ready time
- `orderProducts` (Relation to OrderProducts)

### OrderProducts (Junction Table)
- `id` (Int, Primary Key)
- `orderId` (Int, Foreign Key)
- `productId` (Int, Foreign Key)
- `quantity` (Int)
- `order` (Relation to Order)
- `product` (Relation to Product)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiosco-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/quiosco_db"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
```

5. (Optional) Seed the database with sample data:
```bash
npm run seed
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 📡 Key Functionality

### Server Actions
The application uses Next.js Server Actions for backend operations:

- **`createOrder`** - Creates new customer orders with products and validates using Zod
- **`createProduct`** - Adds new products to catalog with validation (admin only)
- **`updateProduct`** - Modifies product information and image uploads (admin only)
- **`completeOrder`** - Marks orders as ready for pickup and updates timestamps

### State Management
- **Zustand Store** - Manages shopping cart state across the application
- **SWR** - Handles data fetching and real-time updates for orders and products

### Form Validation
All forms use **Zod schemas** for client and server-side validation, ensuring data integrity and providing user-friendly error messages.

## 🔐 Admin Access

The admin dashboard is protected by the `AdminRoute` component, which guards against unauthorized access.

Admin features are available at:
- `/admin/products` - Product management (create, edit, delete, search)
- `/admin/orders` - Order management (view orders, mark as ready)

## 🎨 UI/UX Features

- **Toast Notifications** - User feedback for actions (success, error messages)
- **Responsive Layout** - Mobile-first design approach using Tailwind CSS
- **Category Icons** - Visual product categorization using Heroicons
- **Product Pagination** - Efficient navigation through large product catalogs
- **Real-time Order Updates** - Live order status tracking using SWR
- **Image Uploads** - Cloudinary integration for product images
- **Search Functionality** - Filter products by name and attributes

## 📝 Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint for code quality
npm run seed      # Seed database with sample data
```

## 🔄 Prisma Commands

```bash
npx prisma migrate dev    # Create and apply migrations
npx prisma migrate reset   # Reset database (development only)
npx prisma studio         # Open Prisma Studio GUI for data management
npx prisma generate       # Generate Prisma Client
```

## 🛣️ Routing Architecture

- **Public Routes** (`/order`, `/orders`) - Customer-facing pages with no authentication
- **Admin Routes** (`/admin/*`) - Admin dashboard with access control
- **API Routes** (`/api/*`) - Backend endpoints for data operations (orders, products)
- **Dynamic Routes** - Category-based product filtering (`/order/[category]`)
- **Nested Routes** - Product edit pages with dynamic IDs (`/admin/products/[id]/edit`)

## 💻 API Endpoints

### Customer Orders API
- `GET /app/orders/api` - Fetch all customer orders
- `POST /app/orders/api` - Submit new order

### Admin Orders API
- `GET /app/admin/orders/api` - Fetch all orders for admin dashboard

## 🎯 Workflow

### Customer Workflow
1. Browse products by category on `/order`
2. Add products to shopping cart (stored in Zustand)
3. View cart and modify quantities in order sidebar
4. Submit order with customer name and total price
5. Track order status on `/orders` page

### Admin Workflow
1. Access admin dashboard at `/admin/products`
2. Create new products with images and pricing
3. Edit existing products
4. Search and filter products
5. View incoming orders at `/admin/orders`
6. Mark orders as ready for pickup
7. View detailed order information with product list

## 📦 Dependencies

See [package.json](package.json) for the complete list of dependencies and their versions.

### Key Dependencies Overview
- `@prisma/client` - Database ORM and queries
- `next` - React framework with server components
- `react` & `react-dom` - UI library
- `zustand` - Lightweight state management
- `swr` - Data fetching and caching
- `zod` - Schema validation
- `tailwindcss` - CSS framework
- `react-toastify` - Toast notifications
- `next-cloudinary` - Image management
- `@heroicons/react` - Icon library

## 🔧 Development Tips

- Use `npm run dev` for development with hot reload
- Check database with `npx prisma studio`
- Use TypeScript strict mode for type safety
- All server operations validated with Zod
- Toast notifications for user feedback
- Tailwind CSS for responsive design

## 📄 License

This project is private and confidential.

## 💡 Notes

- All images are stored on Cloudinary for optimal performance and CDN delivery
- The application uses PostgreSQL for reliable data persistence and ACID compliance
- Server Components are used by default for better performance and reduced client-side JavaScript
- Form validation is implemented at both client and server levels for security
- Each order can contain multiple products with different quantities
- Products are organized by categories for better UX
- Real-time updates using SWR for order status and product information
- Admin dashboard is protected from unauthorized access using component guards

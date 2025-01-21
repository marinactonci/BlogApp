# BlogApp 📝

BlogApp is a full-stack web application designed for creating and managing blog posts. It provides users with an intuitive interface to write and view posts while showcasing dynamic features like server-side rendering and a modern user experience.

## ✨ Features

- Create and view blog posts
- Comment on blog posts
- Responsive and clean UI for a seamless user experience
- Integrated database for storing blog posts
- Google Login with OAuth for user authentication
- Server-side rendering for optimal performance

---

## 🛠️ Built With

- **Next.js**: React framework for server-side rendering and static site generation
- **Prisma**: Next-generation ORM for database interaction
- **PostgreSQL**: Relational database for structured data
- **Tailwind CSS**: Utility-first CSS framework for styling
- **NextAuth.js**: Authentication library for handling OAuth
- **TypeScript**: Typed JavaScript for enhanced code reliability

---

## 🚀 Getting Started

Follow these steps to set up and run BlogApp locally on your machine.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure you have a running database)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/marinactonci/BlogApp.git
   cd BlogApp

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<your-database-name>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<your-generated-secret>
   ```

   - Replace `<your-google-client-id>` and `<your-google-client-secret>` with your actual Google OAuth credentials (see below how to obtain them).
   - Generate the `NEXTAUTH_SECRET` by running the following command:

   ```bash
   openssl rand -base64 32
   ```

## 🔐 Setting Up Google OAuth

1. Go to the [Google Developer Console](https://console.developers.google.com/) and create a new project or select an existing one.
2. Navigate to APIs & Services > Credentials and click on Create Credentials > Oauth client ID.
3. Select Web Application as the application type.
4. Add the following to the Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`.
5. Download the client ID and client secret, and save them in the `.env` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, respectively.

## 🗂️ Database Setup with Prisma

1. Initialize Prisma: If not already initialized, generate the Prisma schema:

   ```bash
   npx prisma init
   ```

2. Migrate Database: Apply migrations to create the database tables:

   ```bash
   npx prisma migrate dev
   ```

3. Seed the Database:
   Populate the database with initial data:

   ```bash
   npx ts-node prisma/seed.ts
   ```

4. View the database using Prisma Studio:

   ```bash
   npx prisma studio
   ```

## 🏃‍♂️ Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

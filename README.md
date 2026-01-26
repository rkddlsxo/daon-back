# Daon Backend Server

The backend API for the **Daon** platform, a volunteer matching and community service. Built with **NestJS** to ensure scalability and maintainability.

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: MySQL (TypeORM)
- **Authentication**: JWT & Passport
- **Architecture**: Modular (Domain-driven)

## 📂 Project Structure

The project is organized into modules based on features:

- **Auth**: User authentication and JWT strategy.
- **Users**: User profile management.
- **Volunteers**: Core logic for creating and listing volunteer opportunities.
- **Recruit**: Managing applications for volunteer posts.
- **Reviews**: Review system for completed activities.
- **Board**: Community bulletin board functionality.
- **Mypage**: User dashboard aggregation.

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the backend directory
cd daon-back

# Install dependencies
npm install
```

2. Environment Configuration
Create a .env file in the root directory and configure the following variables:

```bash
# Server
PORT=8080

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=daon_db

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1d
3. Running the App
Bash
# development
$ npm run start

# watch mode (recommended for dev)
$ npm run start:dev

# production mode
$ npm run start:prod
```

🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

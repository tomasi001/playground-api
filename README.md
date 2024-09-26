# Playground API

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D14.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D4.0-blue)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Playground API** is a robust backend service built with Express and TypeScript, designed to interface seamlessly with the OpenAI API. It ensures reliable communication, response validation using Zod schemas, and provides a scalable foundation for developing intelligent applications.

## Features

- **Express.js** server with TypeScript for type safety.
- **OpenAI Integration**: Fetches and processes data from OpenAI's API.
- **Response Validation**: Utilizes Zod schemas to ensure data integrity.
- **CORS Support**: Configurable Cross-Origin Resource Sharing.
- **Environment Configuration**: Managed via dotenv.
- **Logging Middleware**: Logs incoming requests for easier debugging.
- **Testing**: Comprehensive tests using Jest and ts-jest.
- **Development Tools**: Supports nodemon for efficient development workflows.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **Git** installed on your machine

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/playground-api.git
   cd playground-api
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3001
   OPENAI_API_KEY=your_openai_api_key
   ```

   - `PORT`: (Optional) The port number the server will listen on. Defaults to `3001` if not specified.
   - `OPENAI_API_KEY`: Your OpenAI API key for authenticating requests.

2. **Git Ignore**

   Ensure the `.env` file is included in `.gitignore` to prevent sensitive information from being committed:

   ```gitignore
   .env
   node_modules
   ```

## Running the Application

### Development

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

### Production

1. **Build the project**

   ```bash
   npm run build
   ```

   Or using yarn:

   ```bash
   yarn build
   ```

2. **Start the server**

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

The server will start on the port specified in the `.env` file or default to `3001`.

## API Endpoints

### POST `/api/openai`

**Description:** Fetches a detailed product analysis from OpenAI based on the provided prompt.

**Request Body:**

```json
{
  "prompt": "Your prompt here"
}
```

**Response:**

- **Success (200):**

  ```json
  {
    "content": {
      "productIdea": "Innovative Product",
      "businessAnalysis": {
        /* ... */
      },
      "strategyAndPlanning": {
        /* ... */
      },
      "productDefinition": {
        /* ... */
      },
      "technicalArchitecture": {
        /* ... */
      },
      "complianceAndRisk": {
        /* ... */
      },
      "systemDesign": {
        /* ... */
      },
      "refinedConcept": {
        /* ... */
      }
    }
  }
  ```

- **Validation Error (400):**

  ```json
  {
    "errors": [
      "Error at \"productIdea\": Required",
      "Error at \"businessAnalysis.businessCase\": Required"
      // More errors...
    ]
  }
  ```

- **Rate Limit Exceeded (429):**

  ```json
  {
    "message": "Rate limit exceeded. Please try again later."
  }
  ```

- **Server Error (500):**

  ```json
  {
    "message": "Error communicating with OpenAI API"
  }
  ```

## Testing

The project uses Jest for testing. To run the tests:

```bash
npm test
```

Or using yarn:

```bash
yarn test
```

**Test Structure:**

- Tests are located in the `tests` directory.
- Utilizes `ts-jest` for TypeScript support.
- Covers response validation and controller logic.

## Project Structure

```plaintext
playground-api/
├── dist/                      # Compiled JavaScript files
├── src/
│   ├── controllers/           # Route controllers
│   │   └── openaiController.ts
│   ├── middlewares/           # Express middlewares
│   │   └── requestLogger.ts
│   ├── routes/                # API routes
│   │   └── openaiRoutes.ts
│   ├── utils/                 # Utility functions and validation
│   │   └── validateResponse.ts
│   └── server.ts              # Entry point
├── tests/
│   └── utils/
│       └── validateResponse.test.ts
├── .gitignore
├── jest.config.js
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **Node.js & Express**: Backend server framework.
- **TypeScript**: Type safety and enhanced developer experience.
- **Zod**: Schema validation for responses.
- **Axios**: HTTP client for API requests.
- **dotenv**: Environment variable management.
- **Jest & ts-jest**: Testing framework.
- **Nodemon**: Development tool for auto-restarting the server.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing.
- **Colors**: For colored console outputs.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make your changes**
4. **Commit your changes**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to the branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [ISC License](LICENSE).

## Contact

For any questions or feedback, please reach out to [your.email@example.com](mailto:your.email@example.com).

module.exports = {
  // Define the Jest configuration
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "node", // Set the test environment to Node.js
  moduleNameMapper: {
    // Map module names to specific files
    "^openai$": "<rootDir>/__mocks__/openai.ts", // Point to the manual mock file
  },
  testMatch: ["**/tests/**/*.test.ts"], // Specify the pattern for test files
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Define the file extensions for modules
  transform: {
    // Specify how to transform files
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }], // Use ts-jest to transform TypeScript files with config
  },
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    // Specify which files to collect coverage from
    "src/**/*.{ts,tsx}", // Include all TypeScript files in the src directory
    "!src/**/*.test.{ts,tsx}", // Exclude test files from coverage
  ],
  coverageDirectory: "coverage", // Specify the output directory for coverage reports
};

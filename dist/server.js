"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openaiRoutes_1 = __importDefault(require("./routes/openaiRoutes"));
const requestLogger_1 = require("./middlewares/requestLogger");
const cors_1 = __importDefault(require("cors")); // Import CORS
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001; // Use environment variable for port
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Replace with your frontend's actual domain
}));
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
app.use('/api', openaiRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

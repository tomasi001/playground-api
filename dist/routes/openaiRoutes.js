"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openaiController_1 = require("../controllers/openaiController");
const router = (0, express_1.Router)();
router.post('/openai', openaiController_1.getOpenAIResponse);
exports.default = router;

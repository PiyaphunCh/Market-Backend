"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rountes_1 = require("./rountes");
const mongoose_1 = require("mongoose");
var cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
const mongoURI = 'mongodb://localhost:27017/market';
(0, mongoose_1.connect)(mongoURI);
console.log('MongoDB Connected...');
app.use('/api', rountes_1.routes);
app.listen(port, () => console.log(`Application is running on port ${port}`));

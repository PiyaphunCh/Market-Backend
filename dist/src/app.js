"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rountes_1 = require("./rountes");
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const cronjob_1 = __importDefault(require("../cronjob")); // Assuming your cronjob file exports the cron job
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Connect to MongoDB
const mongoURI = 'mongodb://manageadmin:qrmosManageAdmin1234!@165.22.243.246:27017/manage';
(0, mongoose_1.connect)(mongoURI)
    .then(() => {
    console.log('MongoDB Connected...');
    // Start the cron job
    cronjob_1.default.start();
    console.log('Cron job started...');
    // Set up routes
    app.use('/api', rountes_1.routes);
    // Start the server
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});

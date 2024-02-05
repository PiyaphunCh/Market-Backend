"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = __importDefault(require("cron"));
// Define your cron job function
function myCronJob() {
    console.log('Cron job executed!');
    // Add your cron job logic here
}
// Create a cron job
const CronJob = cron_1.default.CronJob;
const job = new CronJob('*/5 * * * * *', myCronJob); // Runs every 5 seconds
// Start the cron job
job.start();
console.log('Cron job scheduled.');

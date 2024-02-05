"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cron_1 = require("cron");
// Define your cron job function
const myCronJob = () => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post('http://localhost:3000/api/get/market', { type: 'all' });
});
// Create a cron job
const job = new cron_1.CronJob('5 * * * * *', myCronJob); // Runs every second
// Start the cron job
job.start();
console.log('Cron job scheduled.');
exports.default = job;

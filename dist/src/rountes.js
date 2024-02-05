"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const market_1 = require("./services/rol/controllers/market");
exports.routes = express_1.default.Router();
exports.routes.post('/get/market', market_1.getRolMarket);
exports.routes.post('/get/item/set/price', market_1.getItemSet);
exports.routes.post('/update/item/set/price', market_1.updateItemSet);

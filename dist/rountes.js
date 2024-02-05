"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const market_1 = require("./services/rol/controllers/market");
const routes = (app) => {
    console.log('test0');
    app.get('/get/market', (req, res) => {
        console.log('test1');
        (0, market_1.getRolMarket)(req, res);
    });
};
exports.routes = routes;

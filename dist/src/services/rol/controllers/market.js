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
exports.updateItemSet = exports.getItemSet = exports.getRolMarket = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const item_model_1 = require("../models/item.model");
const lineNotify = require('line-notify-nodejs')('KYM0B3NC8LGkjCc7IoMOJbmQynpcSE3rM2MrllBeIn2');
const getRolMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req === null || req === void 0 ? void 0 : req.body;
    if (!type) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'please insert correct type' });
    }
    try {
        let typeUrl = '';
        if (type !== 'all') {
            typeUrl = `&category=${type}`;
        }
        let newItem = [];
        yield axios_1.default
            .get(`https://apps.maxion.gg/api/market/list?status=LISTING${typeUrl}`)
            .then((resAxios) => __awaiter(void 0, void 0, void 0, function* () {
            newItem = yield (resAxios === null || resAxios === void 0 ? void 0 : resAxios.data.map((item) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (parseInt((_a = item === null || item === void 0 ? void 0 : item.nft) === null || _a === void 0 ? void 0 : _a.refine) >= 7) {
                    return {
                        name: (_b = item === null || item === void 0 ? void 0 : item.nft) === null || _b === void 0 ? void 0 : _b.nameEnglish,
                        price: parseInt(item === null || item === void 0 ? void 0 : item.price),
                        refine: (_c = item === null || item === void 0 ? void 0 : item.nft) === null || _c === void 0 ? void 0 : _c.refine,
                        enchants: {
                            option0Text: (_d = item === null || item === void 0 ? void 0 : item.nft) === null || _d === void 0 ? void 0 : _d.option0Text,
                            option1Text: (_e = item === null || item === void 0 ? void 0 : item.nft) === null || _e === void 0 ? void 0 : _e.option1Text,
                            option2Text: (_f = item === null || item === void 0 ? void 0 : item.nft) === null || _f === void 0 ? void 0 : _f.option2Text,
                            option3Text: (_g = item === null || item === void 0 ? void 0 : item.nft) === null || _g === void 0 ? void 0 : _g.option3Text,
                            option4Text: (_h = item === null || item === void 0 ? void 0 : item.nft) === null || _h === void 0 ? void 0 : _h.option4Text
                        },
                        img: `https://apps.maxion.gg/_next/image?url=https%3A%2F%2Fcdn.maxion.gg%2Flandverse%2Fimage%2Fcollection%2F${(_j = item === null || item === void 0 ? void 0 : item.nft) === null || _j === void 0 ? void 0 : _j.nameid}.png&w=256&q=75`,
                        link: `https://apps.maxion.gg/roverse/detail/${item === null || item === void 0 ? void 0 : item.id}`
                    };
                }
            }));
            newItem = newItem.filter((item) => {
                return item != null;
            });
            let sumPriceAvg = newItem.reduce((accumulator, currentValue) => accumulator + (currentValue === null || currentValue === void 0 ? void 0 : currentValue.price), 0);
            sumPriceAvg = sumPriceAvg / newItem.length;
            const groupedKeys = yield newItem.reduce((groupPromise, item) => __awaiter(void 0, void 0, void 0, function* () {
                const group = yield groupPromise;
                if (!group[item.name]) {
                    group[item.name] = [];
                    const checkItemDuplicate = yield item_model_1.itemsModel.findOne({
                        name: item.name
                    });
                    if (!checkItemDuplicate) {
                        yield item_model_1.itemsModel.create({
                            name: item.name,
                            buyPrice: 0,
                            img: item.img
                        });
                    }
                }
                group[item.name].push(item);
                return group;
            }), Promise.resolve({}));
            const itemsAll = yield item_model_1.itemsModel.find();
            Object.keys(groupedKeys).forEach(function (key, index) {
                groupedKeys[key].map((item) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const itemIsSetBuy = itemsAll.filter((obj) => {
                        return obj.name === item.name;
                    });
                    if (item.price <= (((_a = itemIsSetBuy[0]) === null || _a === void 0 ? void 0 : _a.buyPrice) || 0)) {
                        let str = `\ngame : rol\n`;
                        str += `item name : ${item.name}\n`;
                        str += `refine : +${item.refine}\n`;
                        str += `.............\n`;
                        str += `enchants\n`;
                        str += `option 1: ${item.enchants.option0Text}\n`;
                        str += `option 2: ${item.enchants.option1Text}\n`;
                        str += `option 3: ${item.enchants.option2Text}\n`;
                        str += `option 4: ${item.enchants.option3Text}\n`;
                        str += `option 5: ${item.enchants.option4Text}\n`;
                        str += `.............\n`;
                        str += `set price : ${itemIsSetBuy[0].buyPrice}\n`;
                        str += `price : ${item === null || item === void 0 ? void 0 : item.price}\n`;
                        str += `.............\n`;
                        str += `link : ${item === null || item === void 0 ? void 0 : item.link}\n`;
                        lineNotify.notify({
                            message: str
                        });
                    }
                }));
            });
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'success',
                count: newItem.length,
                data: newItem,
                groupedKeys: groupedKeys
            });
        }))
            .catch(function (error) {
            if (error.response) {
                return res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ message: error.response.data });
            }
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.getRolMarket = getRolMarket;
const getItemSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { game } = req === null || req === void 0 ? void 0 : req.body;
    if (!game) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'please insert correct game' });
    }
    const allItems = yield item_model_1.itemsModel.find();
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'success',
            data: allItems
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.getItemSet = getItemSet;
const updateItemSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req === null || req === void 0 ? void 0 : req.body;
    if (!items || items.length === 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'please insert correct data' });
    }
    yield items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield item_model_1.itemsModel.findOneAndUpdate({ _id: item.id }, { buyPrice: item.buyPrice });
    }));
    try {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'success'
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
});
exports.updateItemSet = updateItemSet;
module.exports = {
    getRolMarket: exports.getRolMarket,
    getItemSet: exports.getItemSet,
    updateItemSet: exports.updateItemSet
};

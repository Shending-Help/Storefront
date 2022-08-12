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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var __1 = __importDefault(require(".."));
dotenv_1.default.config();
var orderStore = new order_1.Orders();
var request = (0, supertest_1.default)(__1.default);
var token = jsonwebtoken_1.default.sign({ username: 'test', password: 'test123' }, process.env.TOKEN_SECRET);
var testOrder = {
    product_id: 1,
    quantity: 1,
    status: 'pending',
    user_id: 1
};
describe('Order Model', function () {
    it('should have an showOrderByUserId method', function () {
        expect(orderStore.showOrderByUserId).toBeDefined();
    });
});
describe('Order Model methods are working properly', function () {
    it('Create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.create(testOrder)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        expect(result.product_id).toBe(testOrder.product_id);
                        expect(result.quantity).toBe(testOrder.quantity);
                        expect(result.status).toBe(testOrder.status);
                        expect(result.user_id).toBe(testOrder.user_id);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('showOrderByUserId method should return the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orderStore.showOrderByUserId(1)];
                case 1:
                    result = _a.sent();
                    if (result) {
                        expect(result[0].product_id).toBe(1);
                        expect(result[0].quantity).toBe(1);
                        expect(result[0].status).toBe('pending');
                        expect(result[0].user_id).toBe(1);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Orders Routes', function () {
    it('should have a /orders/:id route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/orders/:id').set('Authorization', "Bearer ".concat(token))];
                case 1:
                    result = _a.sent();
                    expect(result.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});

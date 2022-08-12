"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var orderStore = new order_1.Orders();
describe('Order Model', function () {
    it('should have an showOrderByUserId method', function () {
        expect(orderStore.showOrderByUserId).toBeDefined();
    });
});

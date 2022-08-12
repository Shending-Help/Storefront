"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var productStore = new product_1.Products();
describe('Product Model', function () {
    it('should have an index method', function () {
        expect(productStore.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(productStore.show).toBeDefined();
    });
    it('should have a create method', function () {
        expect(productStore.create).toBeDefined();
    });
});

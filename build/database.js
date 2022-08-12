"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var POSTGRES_HOST = process.env.POSTGRES_HOST;
var POSTGRES_USER = process.env.POSTGRES_USER;
var POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD + '';
var POSTGRES_DB = process.env.POSTGRES_DB;
var POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB;
var ENV = process.env.ENV;
var database;
if (ENV === 'dev') {
    database = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    };
}
else if (ENV === 'test') {
    database = {
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: '19992001'
    };
}
var client = new pg_1.Pool(database);
exports.default = client;

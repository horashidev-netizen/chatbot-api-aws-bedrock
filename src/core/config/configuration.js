"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    var _a, _b;
    return ({
        port: parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000', 10),
        database: {
            username: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            port: parseInt((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : '3306', 10),
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME
        },
        jwt: {
            secret: process.env.JWT_SECRET
        }
    });
});

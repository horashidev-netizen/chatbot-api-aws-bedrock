"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Public = exports.IS_PUBLIC_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
var Public = function () { return (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true); };
exports.Public = Public;
exports.User = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var user = request.user;
    return data ? user === null || user === void 0 ? void 0 : user[data] : user;
});

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var mariadb_1 = require("mariadb");
var Database = /** @class */ (function () {
    function Database(config) {
        this.pool = mariadb_1["default"].createPool(config);
    }
    Database.prototype.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pool.getConnection()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.query = function (sql, params, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var connection, namedPlaceholders, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(sql, '\n', params);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.getConnection()];
                    case 2:
                        connection = _a.sent();
                        namedPlaceholders = !Array.isArray(params);
                        return [4 /*yield*/, connection.query(__assign({ sql: sql, namedPlaceholders: namedPlaceholders }, options), params)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_2 = _a.sent();
                        throw error_2;
                    case 5:
                        if (connection) {
                            connection.end();
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.select = function (fields, table, where, orderBy, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var params, sql;
            return __generator(this, function (_a) {
                params = {};
                sql = "SELECT " + fields + " \nFROM " + table;
                if (where) {
                    where = this.buildCondition(where, params);
                    sql += "\nWHERE " + where;
                }
                if (orderBy) {
                    sql += "\nORDER BY " + orderBy;
                }
                if (limit) {
                    sql += "\nLIMIT " + limit;
                }
                return [2 /*return*/, this.query(sql, params)];
            });
        });
    };
    Database.prototype.insert = function (table, params, onDuplicateUpdate) {
        if (onDuplicateUpdate === void 0) { onDuplicateUpdate = false; }
        return __awaiter(this, void 0, void 0, function () {
            var data, sql;
            return __generator(this, function (_a) {
                data = Object.keys(params).map(function (key) {
                    return key + " = :" + key;
                });
                sql = "INSERT INTO " + table + " \nSET " + data;
                if (onDuplicateUpdate) {
                    sql += "\nON DUPLICATE KEY UPDATE \n" + data;
                }
                return [2 /*return*/, this.query(sql, params)];
            });
        });
    };
    Database.prototype.update = function (table, data, where) {
        return __awaiter(this, void 0, void 0, function () {
            var params, sql;
            return __generator(this, function (_a) {
                params = {};
                if (typeof data === 'object' && !Array.isArray(data)) {
                    params = data;
                    data = Object.keys(data).map(function (key) {
                        return key + " = :" + key;
                    });
                }
                sql = "UPDATE " + table + " \nSET " + data;
                if (where) {
                    where = this.buildCondition(where, params);
                    sql += "\nWHERE " + where;
                }
                return [2 /*return*/, this.query(sql, params)];
            });
        });
    };
    Database.prototype["delete"] = function (table, where) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, params;
            return __generator(this, function (_a) {
                sql = "DELETE FROM " + table;
                params = {};
                if (where) {
                    where = this.buildCondition(where, params);
                    sql += "\nWHERE " + where;
                }
                return [2 /*return*/, this.query(sql, params)];
            });
        });
    };
    Database.prototype.buildCondition = function (where, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (Array.isArray(where)) {
            var result = where.map(function (item) {
                return _this.buildCondition(item, params);
            });
            return "(" + result.join(')\nAND (') + ")";
        }
        else if (typeof where === 'object') {
            var result = Object.keys(where).map(function (key) {
                params[key] = where[key];
                return key + " = :" + key;
            });
            return "(" + result.join(')\nAND (') + ")";
        }
        else {
            return where;
        }
    };
    return Database;
}());
exports["default"] = Database;

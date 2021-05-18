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
exports.register = exports.login = exports.checkUser = exports.requireAuthen = void 0;
var axios_1 = __importDefault(require("../config/axios"));
var router_1 = __importDefault(require("next/router"));
var requireAuthen = function (cb) {
    return function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default({
                        method: 'get',
                        url: '/user',
                        headers: ctx.req.headers.cookie ? { cookie: ctx.req.headers.cookie } : undefined
                    })
                    // user not found back to login page
                ];
                case 1:
                    response = _a.sent();
                    // user not found back to login page
                    if (response.status != 200) {
                        return [2 /*return*/, {
                                redirect: {
                                    destination: '/',
                                    permanent: false
                                }
                            }];
                    }
                    return [4 /*yield*/, cb(ctx, response.data)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
};
exports.requireAuthen = requireAuthen;
var checkUser = function () {
    // using cookie to request a user
    console.log('checking user...');
    axios_1.default({
        method: 'get',
        url: '/user',
        withCredentials: true
    }).then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
            console.log('USER already logged in');
            return router_1.default.push('/home');
        }
    });
};
exports.checkUser = checkUser;
var login = function (event) {
    event.preventDefault();
    axios_1.default.post('/auth/login', {
        email: event.target[0].value,
        password: event.target[1].value
    }, { withCredentials: true }).then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
            return router_1.default.push('/home');
        }
        event.target.reset();
        return response.data.err;
    });
};
exports.login = login;
var register = function (event) {
    event.preventDefault();
    axios_1.default.post('/auth/register', {
        email: event.target[1].value,
        password: event.target[2].value,
        username: event.target[0].value,
    }, { withCredentials: true }).then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
            return router_1.default.push('/passport/signin');
        }
        event.target.reset();
        return response.data.err;
    });
};
exports.register = register;

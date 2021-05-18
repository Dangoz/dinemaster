"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(nextApp, controllers) {
        this.nextApp = nextApp;
        this._port = process.env.PORT || 3000;
        this._app = express_1.default();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    App.prototype.start = function () {
        var _this = this;
        this._app.listen(this._port, function () {
            console.log("App listening on the port " + _this._port);
        });
    };
    App.prototype.initializeMiddlewares = function () {
        require("./middlewares/express.middleware")(this._app, this.nextApp);
        require("./middlewares/passport.middleware")(this._app);
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        this._app.all('*', function (req, res, next) {
            if (req.headers['x-forwarded-proto'] === 'http') {
                res.redirect("https://" + req.headers.host + req.url);
            }
            else {
                next();
            }
        });
        controllers.forEach(function (controller) {
            _this._app.use("/", controller.router);
        });
        var handle = this.nextApp.getRequestHandler();
        this._app.all('*', function (req, res) {
            return handle(req, res);
        });
    };
    return App;
}());
exports.default = App;

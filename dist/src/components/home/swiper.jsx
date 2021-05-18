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
var swiper_module_css_1 = __importDefault(require("../../styles/home/swiper.module.css"));
var react_1 = require("react");
var Swiper = function () {
    var scroll = react_1.useRef(null);
    var rightButton = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var start, goal, int;
        return __generator(this, function (_a) {
            start = scroll.current.scrollLeft;
            goal = start;
            int = setInterval(function () {
                scroll.current.scrollTo({
                    left: goal + 20
                });
                goal += 20;
                if (goal >= start + 500)
                    clearInterval(int);
            }, 10);
            return [2 /*return*/];
        });
    }); };
    var leftButton = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var start, goal, int;
        return __generator(this, function (_a) {
            start = scroll.current.scrollLeft;
            goal = start;
            int = setInterval(function () {
                scroll.current.scrollTo({
                    left: goal - 20
                });
                goal -= 20;
                if (goal <= start - 500)
                    clearInterval(int);
            }, 10);
            return [2 /*return*/];
        });
    }); };
    return (<div className={swiper_module_css_1.default.box}>
      
      <div className={swiper_module_css_1.default.container} ref={function (element) { return scroll.current = element; }}>
        <div className={swiper_module_css_1.default.wrapper}>
          <div className={swiper_module_css_1.default.item}> item 1 </div>
          <div className={swiper_module_css_1.default.item}> item 2 </div>
          <div className={swiper_module_css_1.default.item}> item 3 </div>
          <div className={swiper_module_css_1.default.item}> item 4 </div>
          <div className={swiper_module_css_1.default.item}> item 5 </div>
          <div className={swiper_module_css_1.default.item}> item 1 </div>
          <div className={swiper_module_css_1.default.item}> item 2 </div>
          <div className={swiper_module_css_1.default.item}> item 3 </div>
          <div className={swiper_module_css_1.default.item}> item 4 </div>
          <div className={swiper_module_css_1.default.item}> item 5 </div>
          <div className={swiper_module_css_1.default.item}> item 1 </div>
          <div className={swiper_module_css_1.default.item}> item 2 </div>
          <div className={swiper_module_css_1.default.item}> item 3 </div>
          <div className={swiper_module_css_1.default.item}> item 4 </div>
          <div className={swiper_module_css_1.default.item}> item 5 </div>
        </div>
      </div>

      <div className={swiper_module_css_1.default.LRButtons}>
        <div className={swiper_module_css_1.default.right} onClick={leftButton}><svg viewBox="0 0 24 24" width="30" height="30" className={swiper_module_css_1.default.SwipeButton}>
            <path d="M8.08579 16.5858C7.30474 17.3668 7.30474 18.6332 8.08579 19.4142C8.86684 20.1953 10.1332 20.1953 10.9142 19.4142L18.3284 12L10.9142 4.58579C10.1332 3.80474 8.86684 3.80474 8.08579 4.58579C7.30474 5.36684 7.30474 6.63317 8.08579 7.41421L12.6716 12L8.08579 16.5858Z" transform="rotate(180 12 12)"></path>
          </svg></div>

        <div className={swiper_module_css_1.default.left} onClick={rightButton}><svg viewBox="0 0 24 24" width="30" height="30" className={swiper_module_css_1.default.SwipeButton}>
            <path d="M8.08579 16.5858C7.30474 17.3668 7.30474 18.6332 8.08579 19.4142C8.86684 20.1953 10.1332 20.1953 10.9142 19.4142L18.3284 12L10.9142 4.58579C10.1332 3.80474 8.86684 3.80474 8.08579 4.58579C7.30474 5.36684 7.30474 6.63317 8.08579 7.41421L12.6716 12L8.08579 16.5858Z"></path>
          </svg></div>
      </div>

    </div>);
};
exports.default = Swiper;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var home_module_css_1 = __importDefault(require("../../styles/home/home.module.css"));
var Item = function (_a) {
    var post = _a.post;
    return (<>
      <div className={home_module_css_1.default.item}>
        {/* <img className={HomeStyle.item} src={post.source} /> */}
      </div>
    </>);
};
exports.default = Item;

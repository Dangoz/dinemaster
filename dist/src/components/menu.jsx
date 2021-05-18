"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var menu_module_css_1 = __importDefault(require("../styles/menu.module.css"));
var link_1 = __importDefault(require("next/link"));
var Menu = function () {
    return (<div className={menu_module_css_1.default.wrapper}>

      <ul className={menu_module_css_1.default.options}>
        <li><link_1.default href="/home"><img src="/menu/home.png" alt="home"></img></link_1.default></li>
        <li><link_1.default href="/search"><img src="/menu/search.png" alt="search"></img></link_1.default></li>
        <li><link_1.default href="/post"><img className={menu_module_css_1.default.plus} src="/menu/plus.png" alt="plus"></img></link_1.default></li>
        <li><link_1.default href="/message"><img className={menu_module_css_1.default.message} src="/menu/message.png" alt="message"></img></link_1.default></li>
        <li><link_1.default href="/profile"><img src="/menu/profile.png" alt="profile"></img></link_1.default></li>
      </ul>

    </div>);
};
exports.default = Menu;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var home_module_css_1 = __importDefault(require("../../styles/home/home.module.css"));
var react_1 = require("react");
var post_1 = __importDefault(require("../../api/post"));
var react_stack_grid_1 = __importDefault(require("react-stack-grid"));
var item_1 = __importDefault(require("./item"));
var Content = function (_a) {
    var userId = _a.userId;
    var _b = react_1.useState(null), posts = _b[0], setPosts = _b[1];
    react_1.useEffect(function () {
        post_1.default.getPosts(userId)
            .then(function (data) { return setPosts(data); });
    }, []);
    return (<>
      <react_stack_grid_1.default className={home_module_css_1.default.content} columnWidth={200} gutterWidth={20}>

        {posts ? posts.map(function (post, index) { return (<item_1.default key={index} post={post}/>); }) :
            []}
      </react_stack_grid_1.default>


    </>);
};
exports.default = Content;

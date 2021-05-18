"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var landing_module_css_1 = __importDefault(require("../../styles/landing/landing.module.css"));
var link_1 = __importDefault(require("next/link"));
var require_authen_1 = require("../../api/require.authen");
var react_1 = require("react");
var landing = function () {
    react_1.useEffect(function () {
        require_authen_1.checkUser();
    }, []);
    return (<>
      <div className={landing_module_css_1.default.wrapper}>

        <div className={landing_module_css_1.default.head}>
        <img className={landing_module_css_1.default.logo} src="/logo_white_vertical.svg" alt="logo"/>
        <br />Stay Posted, Stay Fresh
        <br />with other restaurants
        </div>
        
        <div className={landing_module_css_1.default.options}>
          <link_1.default href="/passport/signin"><button className={landing_module_css_1.default.coloredLink}>Sign In</button></link_1.default>
          <link_1.default href="/passport/signup"><button className={landing_module_css_1.default.uncoloredLink}>Sign Up</button></link_1.default>

        </div>

      </div>

    </>);
};
// landing.getInitialProps = async () => {
//   return {};
// };
exports.default = landing;

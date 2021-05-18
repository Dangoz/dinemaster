"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var landing_module_css_1 = __importDefault(require("../../styles/landing/landing.module.css"));
var link_1 = __importDefault(require("next/link"));
var require_authen_1 = require("../../api/require.authen");
var react_1 = require("react");
var signin = function () {
    react_1.useEffect(function () {
        require_authen_1.checkUser();
    }, []);
    return (<div className={landing_module_css_1.default.wrapper}>

      <div className={landing_module_css_1.default.head}>
        <img className={landing_module_css_1.default.logo} src="/logo_white_vertical.svg" alt="logo"/>
        <br />Stay Posted, Stay Fresh
        <br />with other restaurants
      </div>

      <div className={landing_module_css_1.default.options}>

        <form className={landing_module_css_1.default.signinForm} onSubmit={require_authen_1.login}>

          <input className={landing_module_css_1.default.landingInput} type="email" id="email" name="email" placeholder="Email"/> <br />

          <input className={landing_module_css_1.default.landingInput} type="password" id="password" name="password" placeholder="Password"/> <br />


          <input className={landing_module_css_1.default.coloredLink} type="submit" value="Log In"/>

          <link_1.default href="/passport/signup"><div className={landing_module_css_1.default.black}>new User? Sign Up</div></link_1.default>
        </form>


      </div>
    </div>);
};
exports.default = signin;

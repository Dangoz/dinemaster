"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var landing_module_css_1 = __importDefault(require("../../styles/landing/landing.module.css"));
var link_1 = __importDefault(require("next/link"));
var require_authen_1 = require("../../api/require.authen");
var react_1 = require("react");
var signup = function () {
    react_1.useEffect(function () {
        require_authen_1.checkUser();
    }, []);
    return (<div className={landing_module_css_1.default.white}>
      <form className={landing_module_css_1.default.registerForm} onSubmit={require_authen_1.register}>

        <label className={landing_module_css_1.default.registerLabel}>Username</label><br />
        <input className={landing_module_css_1.default.landingInput + " " + landing_module_css_1.default.registerInput} type="username" id="username" name="username" placeholder=""/><br />

        <label className={landing_module_css_1.default.registerLabel2}>Email</label><br />
        <input className={landing_module_css_1.default.landingInput + " " + landing_module_css_1.default.registerInput} type="email" id="email" name="email" placeholder=""/> <br />

        <label className={landing_module_css_1.default.registerLabel}>Password</label><br />
        <input className={landing_module_css_1.default.landingInput + " " + landing_module_css_1.default.registerInput} type="password" id="password" name="password" placeholder=""/> <br />


        <input className={landing_module_css_1.default.coloredLink} type="submit" value="Sign Up"/>

        <link_1.default href="/passport/signin"><div className={"" + landing_module_css_1.default.blackRegister}>Sign In</div></link_1.default>
      </form>

    </div>);
};
exports.default = signup;

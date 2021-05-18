"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var profile_module_css_1 = __importDefault(require("../../styles/profile.module.css"));
var react_1 = require("react");
var user_1 = __importDefault(require("../../api/user"));
var Bio = function (_a) {
    var id = _a.id, bio = _a.bio;
    var _b = react_1.useState(false), edit = _b[0], setEdit = _b[1];
    var _c = react_1.useState(bio), content = _c[0], setContent = _c[1];
    var movedOut = function (event) {
        setEdit(false);
        if (bio !== content)
            user_1.default.updateBio(id, content);
    };
    var enterKey = function (event) {
        if (event.key === "Enter") {
            setEdit(false);
            if (bio !== content)
                user_1.default.updateBio(id, content);
        }
    };
    var editContent = function (event) {
        setContent(event.target.value);
    };
    var showInput = function (event) {
        setEdit(true);
    };
    return (<>
      {edit && <input onMouseOut={movedOut} maxLength={50} onKeyDown={enterKey} onChange={editContent} value={content} className={profile_module_css_1.default.bio + " " + profile_module_css_1.default.bioInput}/>}

      {!edit && <div onClick={showInput} className={profile_module_css_1.default.bio}>{content}
      </div>}
    </>);
};
exports.default = Bio;

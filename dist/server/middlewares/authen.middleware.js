"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardAuthenticated = exports.ensureAuthenticated = void 0;
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("user authenticated @@@");
        return next();
    }
    console.log("not authenticated!");
    res.status(299).json({ err: "not authenticated" });
};
exports.ensureAuthenticated = ensureAuthenticated;
var forwardAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/home');
};
exports.forwardAuthenticated = forwardAuthenticated;

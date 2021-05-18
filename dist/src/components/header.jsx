"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import React from 'react'
var prop_types_1 = __importDefault(require("prop-types"));
var Header = function (item) {
    return (<header>
      <h1> Hello, {item.title} !</h1>
    </header>);
};
Header.defaultProps = { title: "i'm a header hehe" };
Header.propTypes = {
    title: prop_types_1.default.string.isRequired,
};
exports.default = Header;

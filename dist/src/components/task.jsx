"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var task = function () {
    // let task: string[] = []
    var _a = react_2.useState([1, 2, 3, 'uwu']), task = _a[0], setTask = _a[1];
    var items = [];
    for (var _i = 0, task_1 = task; _i < task_1.length; _i++) {
        var i = task_1[_i];
        items.push(<div key={i}> {i}</div>);
    }
    return (<>
      {items}
    </>);
};
exports.default = task;
// import { useState } from 'react';

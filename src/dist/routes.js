"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Home_1 = require("./pages/Home");
var CreatePoint_1 = require("./pages/CreatePoint");
var Routes = function () {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(react_router_dom_1.Route, { component: Home_1["default"], path: "/", exact: true }),
        react_1["default"].createElement(react_router_dom_1.Route, { component: CreatePoint_1["default"], path: "/create-point" })));
};
exports["default"] = Routes;

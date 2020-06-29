"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var logo_svg_1 = require("../../assets/logo.svg");
var react_router_dom_1 = require("react-router-dom");
require("./styles.css");
var Home = function () {
    return (react_1["default"].createElement("div", { id: "page-home" },
        react_1["default"].createElement("div", { className: "content" },
            react_1["default"].createElement("header", null,
                react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: "" })),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement("h1", null, "Seu marketplace de coleta  de residuos."),
                react_1["default"].createElement("p", null, "Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente."),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/create-point" },
                    react_1["default"].createElement("span", null,
                        react_1["default"].createElement(fi_1.FiLogIn, null)),
                    react_1["default"].createElement("strong", null, "Cadastre um ponto de coleta"))))));
};
exports["default"] = Home;

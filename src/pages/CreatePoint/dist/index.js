"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
require("./styles.css");
var logo_svg_1 = require("../../assets/logo.svg");
var react_router_dom_1 = require("react-router-dom");
var fi_1 = require("react-icons/fi");
var react_leaflet_1 = require("react-leaflet");
var api_1 = require("../../services/api");
var axios_1 = require("axios");
var CreatePoint = function () {
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.useState([]), ufs = _b[0], setUfs = _b[1];
    var _c = react_1.useState([]), cities = _c[0], setCities = _c[1];
    var _d = react_1.useState([0, 0]), initialPosition = _d[0], setInitialPosition = _d[1];
    var _e = react_1.useState({
        name: '',
        email: '',
        whatsapp: ''
    }), formData = _e[0], setFormData = _e[1];
    var _f = react_1.useState('o'), selectedUf = _f[0], setSelectUf = _f[1];
    var _g = react_1.useState('o'), selectedCity = _g[0], setSelectedCity = _g[1];
    var _h = react_1.useState([]), selectedItem = _h[0], setselectedItem = _h[1];
    var _j = react_1.useState([0, 0]), selectedPosition = _j[0], setSelectedPosition = _j[1];
    var history = react_router_dom_1.useHistory();
    react_1.useEffect(function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
            setInitialPosition([latitude, longitude]);
        });
    }, []);
    react_1.useEffect(function () {
        api_1["default"].get('items').then(function (response) {
            setItems(response.data);
        });
    }, []);
    react_1.useEffect(function () {
        axios_1["default"].get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(function (response) {
            var ufInitials = response.data.map(function (uf) { return uf.sigla; });
            setUfs(ufInitials);
        });
    }, []);
    react_1.useEffect(function () {
        if (selectedUf === '0') {
            return;
        }
        axios_1["default"].get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selectedUf + "/distritos")
            .then(function (response) {
            var cityNames = response.data.map(function (city) { return city.nome; });
            setCities(cityNames);
        });
    }, [selectedUf]);
    function HandleSelectedUf(event) {
        var uf = event.target.value;
        setSelectUf(uf);
    }
    function HandleSelectedCity(event) {
        var city = event.target.value;
        setSelectedCity(city);
    }
    function HandleMapCLick(event) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }
    function handleInputChange(event) {
        var _a;
        var _b = event.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
    }
    function hundleSelectedItem(id) {
        var alreadySelected = selectedItem.findIndex(function (item) { return item === id; });
        if (alreadySelected >= 0) {
            var filteredItems = selectedItem.filter(function (item) { return item !== id; });
            setselectedItem(filteredItems);
        }
        else {
            setselectedItem(__spreadArrays(selectedItem, [id]));
        }
    }
    function hundleSubmit(event) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email, whatsapp, uf, city, latitude, longitude, items, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        name = formData.name, email = formData.email, whatsapp = formData.whatsapp;
                        uf = selectedUf;
                        city = selectedCity;
                        latitude = selectedPosition[0], longitude = selectedPosition[1];
                        items = selectedItem;
                        data = { name: name,
                            email: email,
                            whatsapp: whatsapp,
                            uf: uf,
                            city: city,
                            latitude: latitude,
                            longitude: longitude,
                            items: items
                        };
                        return [4 /*yield*/, api_1["default"].post('points', data)];
                    case 1:
                        _a.sent();
                        alert('Ponto de coleta criado');
                        history.push('/');
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("div", { id: "page-create-point" },
        react_1["default"].createElement("header", null,
            react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: "Ecoleta" }),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/" },
                react_1["default"].createElement(fi_1.FiArrowLeft, null),
                "Voltar para home")),
        react_1["default"].createElement("form", { onSubmit: hundleSubmit },
            react_1["default"].createElement("h1", null,
                "Cadastro do ",
                react_1["default"].createElement("br", null),
                " ponto de coleta"),
            react_1["default"].createElement("fieldset", null,
                react_1["default"].createElement("legend", null,
                    react_1["default"].createElement("h2", null, "Dados")),
                react_1["default"].createElement("div", { className: "field" },
                    react_1["default"].createElement("label", { htmlFor: "name" }, "Nome da entidade"),
                    react_1["default"].createElement("input", { type: "text", name: "name", id: "name", onChange: handleInputChange })),
                react_1["default"].createElement("div", { className: "field-group" },
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("label", { htmlFor: "name" }, "E-mail"),
                        react_1["default"].createElement("input", { type: "email", name: "email", id: "email", onChange: handleInputChange })),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("label", { htmlFor: "name" }, "Whatsapp"),
                        react_1["default"].createElement("input", { type: "text", name: "whatsapp", id: "whatsapp", onChange: handleInputChange })))),
            react_1["default"].createElement("fieldset", null,
                react_1["default"].createElement("legend", null,
                    react_1["default"].createElement("h2", null, "Endere\u00E7o"),
                    react_1["default"].createElement("span", null, "Selecione o endere\u00E7o no mapa")),
                react_1["default"].createElement(react_leaflet_1.Map, { center: initialPosition, zoom: 14, onCLick: HandleMapCLick },
                    react_1["default"].createElement(react_leaflet_1.TileLayer, { attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
                    react_1["default"].createElement(react_leaflet_1.Marker, { position: selectedPosition })),
                react_1["default"].createElement("div", { className: "field-group" },
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("label", { htmlFor: "uf" }, " Estado (UF)"),
                        react_1["default"].createElement("select", { name: "uf", id: "uf", value: selectedUf, onChange: HandleSelectedUf },
                            react_1["default"].createElement("option", { value: "0" }, "Selecione uma UF"),
                            ufs.map(function (uf) { return (react_1["default"].createElement("option", { key: uf, value: uf }, uf)); }))),
                    react_1["default"].createElement("div", { className: "field" },
                        react_1["default"].createElement("label", { htmlFor: "city" }, "Cidade"),
                        react_1["default"].createElement("select", { name: "city", id: "city", value: selectedCity, onChange: HandleSelectedCity },
                            react_1["default"].createElement("option", { value: "0" }, "Selecione uma cidade"),
                            cities.map(function (city) { return (react_1["default"].createElement("option", { key: city, value: city }, city)); }))))),
            react_1["default"].createElement("fieldset", null,
                react_1["default"].createElement("legend", null,
                    react_1["default"].createElement("h2", null, "?tens de coleta"),
                    react_1["default"].createElement("span", null, "Selecione um ou mais itens abaixo")),
                react_1["default"].createElement("ul", { className: "items-grid" }, items.map(function (item) { return (react_1["default"].createElement("li", { className: selectedItem.includes(item.id) ? 'selected' : '', key: item.id, onClick: function () { return hundleSelectedItem(item.id); } },
                    react_1["default"].createElement("img", { src: item.image_url, alt: item.title }),
                    react_1["default"].createElement("span", null, item.title))); }))),
            react_1["default"].createElement("button", { type: "submit" }, "Cadastrar ponto de coleta"))));
};
exports["default"] = CreatePoint;

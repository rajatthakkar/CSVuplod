"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerHome = void 0;
const home_controller_1 = __importDefault(require("../controller/home.controller"));
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const routerHome = (0, express_1.Router)();
exports.routerHome = routerHome;
const homeController = new home_controller_1.default();
console.log("inside router");
routerHome.get('/', (req, res) => {
    console.log("inside route function");
    homeController.renderHomePage(req, res);
});
routerHome.post('/upload', multer_1.default.single('filefield'), (req, res) => {
    console.log("inside file Route");
    homeController.validatedFile(req, res);
});
routerHome.get('/show/:id', (req, res) => {
    console.log("inside file Route");
    homeController.showFileData(req, res);
});

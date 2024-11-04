"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema = new mongoose_1.default.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const File = mongoose_1.default.model('Documents_List', fileSchema);
exports.default = File;

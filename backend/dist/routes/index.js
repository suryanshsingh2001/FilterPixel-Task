"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRoutes = exports.downloadRoutes = exports.saturationRoutes = exports.cropRoutes = exports.rotationRoutes = exports.contrastRoutes = exports.brightnessRoutes = exports.uploadRoutes = void 0;
const upload_1 = __importDefault(require("./upload"));
exports.uploadRoutes = upload_1.default;
const brightness_1 = __importDefault(require("./brightness"));
exports.brightnessRoutes = brightness_1.default;
const contrast_1 = __importDefault(require("./contrast"));
exports.contrastRoutes = contrast_1.default;
const rotation_1 = __importDefault(require("./rotation"));
exports.rotationRoutes = rotation_1.default;
const crop_1 = __importDefault(require("./crop"));
exports.cropRoutes = crop_1.default;
const saturation_1 = __importDefault(require("./saturation"));
exports.saturationRoutes = saturation_1.default;
const download_1 = __importDefault(require("./download"));
exports.downloadRoutes = download_1.default;
const reset_1 = __importDefault(require("./reset"));
exports.resetRoutes = reset_1.default;

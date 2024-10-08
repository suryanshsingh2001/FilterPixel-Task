"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// POST /api/process - Handle image manipulation (brightness, contrast, etc.)
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brightness, contrast, saturation, rotation } = req.body;
    try {
        const imageBuffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '../uploads', 'image.jpeg'));
        let image = (0, sharp_1.default)(imageBuffer);
        // Apply brightness, contrast, and saturation adjustments
        image = image.modulate({
            brightness: brightness / 100,
            saturation: saturation / 100,
        });
        // Apply contrast and rotation
        image = image
            .linear(contrast / 100, -(128 * (contrast / 100 - 1)))
            .rotate(rotation);
        // Generate a low-quality preview
        const previewBuffer = yield image
            .resize(800)
            .jpeg({ quality: 60 })
            .toBuffer();
        const previewPath = path_1.default.join(__dirname, '../uploads', `${Date.now()}.jpeg`);
        fs_1.default.writeFileSync(previewPath, previewBuffer);
        res.json({ previewUrl: `/uploads/${path_1.default.basename(previewPath)}` });
    }
    catch (error) {
        res.status(500).json({ message: 'Error processing image' });
    }
}));
exports.default = router;

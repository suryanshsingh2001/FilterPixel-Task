import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const imagePath = path.resolve(process.cwd(), "uploads", `image.jpeg`);


// POST /api/brightness - Adjust image brightness
router.post('/', async (req, res) => {
  const { brightness } = req.body;

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const image = sharp(imageBuffer)
      .modulate({ brightness: brightness / 100 });

    const previewBuffer = await image.resize(800).jpeg({ quality: 60 }).toBuffer()
    fs.writeFileSync(imagePath, previewBuffer);

    
    console.log(imagePath);
    res.json({ previewUrl: `${path.basename(imagePath)}` });
  } catch (error) {
    res.status(500).json({ message: 'Error processing image' });
  }
});

export default router;

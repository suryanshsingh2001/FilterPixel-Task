import express from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const router = express.Router();

// Paths for original and preview images
const uploadsDir = path.resolve(process.cwd(), "uploads");
const originalImagePath = path.join(uploadsDir, "original.jpeg");
const previewImagePath = path.join(uploadsDir, "preview.jpeg");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Helper function to save preview images
const savePreviewImage = async (imageBuffer: Buffer, filePath: string) => {
  return sharp(imageBuffer)
    .resize(800) // Resize for preview (low-quality)
    .jpeg({ quality: 80 }) // Lower quality for preview
    .toFile(filePath);
};

// POST /api/saturation - Adjust image saturation
router.post("/", async (req, res) => {
  const { saturation } = req.body;

  console.log(`Adjusting saturation to: ${saturation}`);

  try {
    // Load the original image
    const imageBuffer = fs.readFileSync(originalImagePath);
    let image = sharp(imageBuffer);

    // Adjust saturation
    image = image.modulate({ saturation: saturation / 100 });

    // Save the updated original image
    await image.toFile(originalImagePath); // Overwrite the original

    // Generate and save the preview image
    await savePreviewImage(imageBuffer, previewImagePath);

    // Return the preview URL with cache-busting


    console.log("Saturation adjusted, " + previewImagePath);
    res.json({ previewUrl: `${path.basename(previewImagePath)}?t=${Date.now()}` });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ message: "Error adjusting saturation" });
  }
});

export default router;

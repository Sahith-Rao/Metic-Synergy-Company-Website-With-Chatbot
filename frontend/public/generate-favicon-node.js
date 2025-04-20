/**
 * Favicon.ico Generator using Node.js
 * 
 * This script generates a favicon.ico file from the existing new_logo.png
 * It creates various sizes required for Google search results and browser compatibility
 *
 * To run:
 * 1. npm install sharp to-ico
 * 2. node generate-favicon-node.js
 */

const fs = require('fs');
const sharp = require('sharp');
const toIco = require('to-ico');

console.log('Starting favicon.ico generation...');

// Sizes needed for favicon.ico
const sizes = [16, 32, 48, 64];

// Path to the source image
const sourceImage = 'new_logo.png';

// Check if source image exists
if (!fs.existsSync(sourceImage)) {
  console.error(`Error: ${sourceImage} not found. Make sure you run this script from the directory containing ${sourceImage}`);
  process.exit(1);
}

// Function to resize image
async function resizeImage(size) {
  const outputPath = `favicon-${size}.png`;
  
  try {
    await sharp(sourceImage)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`Error resizing to ${size}x${size}:`, error);
    throw error;
  }
}

// Main function
async function generateFavicon() {
  try {
    // Create resized PNG images
    const pngFiles = [];
    for (const size of sizes) {
      const file = await resizeImage(size);
      pngFiles.push(file);
    }

    // Read the generated PNG files
    const pngBuffers = pngFiles.map(file => fs.readFileSync(file));

    // Convert PNG files to ICO
    const icoBuffer = await toIco(pngBuffers);

    // Write the ICO file
    fs.writeFileSync('favicon.ico', icoBuffer);
    console.log('favicon.ico generated successfully!');

    // Clean up temporary PNG files
    pngFiles.forEach(file => {
      fs.unlinkSync(file);
      console.log(`Removed temporary file ${file}`);
    });

    // Generate favicon-32x32.png and favicon-16x16.png (commonly used)
    await sharp(sourceImage).resize(32, 32).png().toFile('favicon-32x32.png');
    await sharp(sourceImage).resize(16, 16).png().toFile('favicon-16x16.png');
    console.log('Generated favicon-32x32.png and favicon-16x16.png');

    // Generate apple-touch-icon.png
    await sharp(sourceImage).resize(180, 180).png().toFile('apple-touch-icon.png');
    console.log('Generated apple-touch-icon.png');

    console.log('\nAll favicon files generated successfully!');
    console.log('\nIMPORTANT: Deploy favicon.ico to the root of your domain:');
    console.log('https://www.meticsynergy.com/favicon.ico');
    
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

// Run the main function
generateFavicon();
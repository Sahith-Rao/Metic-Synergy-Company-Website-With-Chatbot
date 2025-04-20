#!/bin/bash
# Favicon generation script for Metic Synergy
# This script provides instructions and commands to generate a complete set of
# favicon files from the new_logo.png image for maximum browser compatibility.

echo "==============================================================="
echo "Metic Synergy Favicon Generator"
echo "---------------------------------------------------------------"
echo "This script will help you generate all the necessary favicon"
echo "files from your new_logo.png image."
echo "==============================================================="
echo ""
echo "REQUIREMENTS:"
echo "- ImageMagick (convert command)"
echo "- npm package 'png-to-ico' for ICO conversion"
echo "- Original high-resolution logo (new_logo.png)"
echo ""
echo "INSTALLATION INSTRUCTIONS:"
echo "1. Install ImageMagick: https://imagemagick.org/script/download.php"
echo "2. Install png-to-ico: npm install -g png-to-ico"
echo ""
echo "MANUAL EXECUTION INSTRUCTIONS:"
echo "-------------------------------"
echo "Run the following commands in your terminal from the frontend/public directory:"
echo ""

echo "# 1. Generate 16x16 PNG favicon"
echo "convert new_logo.png -resize 16x16 favicon-16x16.png"
echo ""

echo "# 2. Generate 32x32 PNG favicon"
echo "convert new_logo.png -resize 32x32 favicon-32x32.png"
echo ""

echo "# 3. Generate 192x192 PNG favicon for Android"
echo "convert new_logo.png -resize 192x192 favicon-192x192.png"
echo ""

echo "# 4. Generate 512x512 PNG favicon for PWA"
echo "convert new_logo.png -resize 512x512 favicon-512x512.png"
echo ""

echo "# 5. Generate Apple Touch Icon (180x180)"
echo "convert new_logo.png -resize 180x180 apple-touch-icon.png"
echo ""

echo "# 6. Generate ICO file (combines 16x16, 32x32, 48x48)"
echo "# Method 1: Using ImageMagick"
echo "convert new_logo.png -define icon:auto-resize=16,32,48 favicon.ico"
echo ""
echo "# Method 2: Using png-to-ico (better compatibility)"
echo "png-to-ico new_logo.png > favicon.ico"
echo ""

echo "# 7. Generate maskable icon (with padding for safe zone)"
echo "convert new_logo.png -resize 192x192 -gravity center -background none -extent 192x192 maskable-icon.png"
echo ""

echo "# Online favicon generators"
echo "If you prefer an online tool, use one of these services:"
echo "- https://realfavicongenerator.net/"
echo "- https://favicon.io/"
echo "- https://www.favicon-generator.org/"
echo ""

echo "After generating all the favicon files, they will be referenced by the HTML and manifest files already set up."
echo "The favicons should now appear in browser tabs and in Google search results."
echo ""
echo "==============================================================="
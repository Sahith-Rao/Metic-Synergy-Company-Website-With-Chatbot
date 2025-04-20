#!/bin/bash
# Favicon.ico Generator for Google Search Results
# This script specifically generates a favicon.ico file optimized for Google search results
# It focuses on creating the file that will be placed at the root of the domain (https://www.meticsynergy.com/favicon.ico)

echo "========================================================================"
echo "Favicon.ico Generator for Google Search Results"
echo "------------------------------------------------------------------------"
echo "This script generates a favicon.ico file specifically optimized for"
echo "Google search results, using the existing new_logo.png image."
echo "========================================================================"
echo ""

# Check if new_logo.png exists
if [ ! -f "new_logo.png" ]; then
    echo "ERROR: new_logo.png not found in the current directory."
    echo "Please run this script from the directory containing new_logo.png."
    exit 1
fi

echo "Found new_logo.png, generating favicon.ico..."
echo ""

# Method 1: Using ImageMagick (best quality)
if command -v convert &> /dev/null; then
    echo "Using ImageMagick to generate favicon.ico..."
    convert new_logo.png -background none -define icon:auto-resize=16,32,48,64,128 favicon.ico
    echo "favicon.ico generated successfully with ImageMagick."
    echo ""
else
    echo "ImageMagick not found. Please install ImageMagick or use an alternative method."
    echo ""
    echo "Alternative methods:"
    echo ""
    echo "1. Using png-to-ico npm package:"
    echo "   npm install -g png-to-ico"
    echo "   png-to-ico new_logo.png > favicon.ico"
    echo ""
    echo "2. Use an online converter:"
    echo "   - https://www.favicon-generator.org/"
    echo "   - https://favicon.io/favicon-converter/"
    echo "   - https://realfavicongenerator.net/"
    echo ""
fi

# Check if favicon.ico was created
if [ -f "favicon.ico" ]; then
    echo "IMPORTANT: Deploy this favicon.ico file to the ROOT directory of your website."
    echo "It should be accessible at: https://www.meticsynergy.com/favicon.ico"
    echo ""
    echo "Additionally, ensure your HTML includes these basic favicon references:"
    echo ""
    echo '<link rel="icon" href="/favicon.ico" type="image/x-icon">'
    echo '<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">'
    echo ""
    echo "These references have already been added to your index.html file."
    echo ""
    echo "Test Google's ability to access your favicon with:"
    echo 'curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -I https://www.meticsynergy.com/favicon.ico'
    echo ""
    echo "For faster indexing, request a recrawl in Google Search Console after deployment."
    echo ""
else
    echo "Error: favicon.ico was not created. Please try one of the alternative methods."
fi

echo "========================================================================"